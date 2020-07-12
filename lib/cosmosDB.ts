import * as Cosmos from '@azure/cosmos';
import { info } from './logger';

import * as throttledQueue from 'throttled-queue';

import { httpRequestLimitPerMs } from '../config/config.json';

/**
 * Cosmos query custom param type
 */
export interface Param {
    name: string;
    value: string | number | boolean;
}

/**
 * Cosmos lib - used to manipulate database and container
 */
export class CosmosDB {
    private _dbClient;
    private _database;
    private _container;
    private _throttle;

    constructor(config, containerId: string) {
        //If connecting to the Cosmos DB Emulator, disable TLS verification for your node process:
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        //control http connection timeout via connection buffer overflow
        const { defaultHttpRequestLimit, defaultPerMs, evenlySpacedRequest } = httpRequestLimitPerMs;
        info(
            `HTTP request throttle Queue values defaultRequestLimit(1000) : ${defaultHttpRequestLimit}, 
             defaultPerMs(4000) : ${defaultPerMs}. (can be configured in config.js )`,
        );

        this._throttle = throttledQueue(defaultHttpRequestLimit, defaultPerMs, evenlySpacedRequest);

        const endpoint = config.endpoint;
        const key = config.key;
        this._dbClient = new Cosmos.CosmosClient({ endpoint, key });

        this._database = this._dbClient.database(config.databaseId);
        this._container = this._database.container(containerId);
    }

    /**
     * Query database
     */
    public async get(query: string, params: Array<Param>): Promise<any> {
        const querySpec = {
            query: query,
            parameters: params,
        };
        const { resources: items } = await this._container.items.query(querySpec).fetchAll();
        return items;
    }

    /**
     * Bulk insert
     */
    public async insertAll(data: Array<any>) {
        await Promise.all(data.map((row: any) => this._container.items.create(row)));
    }

    /**
     * Batch process request to insert record
     */
    public async batchInsert(data: Array<any>): Promise<Array<any>> {
        return Promise.all(
            data.map((row: any) => {
                return new Promise((res, rej) => {
                    this._throttle(() => {
                        info(`Request Made :`);
                        res(this._container.items.create(row));
                    });
                });
            }),
        );
    }

    /**
     * Insert Single record
     */
    public async insert(data: any) {
        await this._container.items.create(data);
    }

    /**
     * Create the database if it does not exist
     */
    async createDatabase({ databaseId }) {
        const { database } = await this._dbClient.databases.createIfNotExists({
            id: databaseId,
        });
        info(`Created database:${database.id}`);
    }

    /**
     * Create the container if it does not exist
     */
    async createContainer({ databaseId, containerId, partitionKey, throughPut }) {
        const { container } = await this._dbClient
            .database(databaseId)
            .containers.createIfNotExists({ id: containerId, partitionKey }, { offerThroughput: throughPut });
        info(`Created container:${containerId}`);
    }

    /**
     * Scale a container
     * You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
     */
    async scaleContainer({ databaseId, containerId, newRups }) {
        newRups = newRups ? newRups : 400;
        const { resource: containerDefinition } = await this._dbClient
            .database(databaseId)
            .container(containerId)
            .read();
        const { resources: offers } = await this._dbClient.offers.readAll().fetchAll();

        for (var offer of offers) {
            if (containerDefinition._rid !== offer.offerResourceId) {
                continue;
            }
            offer.content.offerThroughput = newRups;
            const offerToReplace = this._dbClient.offer(offer.id);
            await offerToReplace.replace(offer);
            info(`Updated offer to ${newRups} RU/s\n`);
            break;
        }
    }

    /**
     * Cleanup the database and collection on completion
     */
    async cleanup({ databaseId }) {
        await this._dbClient.database(databaseId).delete();
    }
}
