# Excel Genrating statergies

    - This docs illustrates how the sample xlsx is genrated.
    - Feel free to tweak and plat with it

## SNO

    -In the cell in the first row, enter 1 manually. In this case, it’s in cell A2.
    -In cell A3, enter the formula, =A2+1
    -Copy and paste the formula for all the cells in the column.

## IS FREE

    -manual typing: yes / no

## COURSE TITLE

    -cell formula : =CHOOSE(RANDBETWEEN(1,5),"Aerodynamics","IT","CSE","MECH","E-CORE")
    -click hold the right corner of cell and drag till the column or row end.

## Grade

    -cell formula : =RANDBETWEEN(40,100)
    -click hold the right corner of cell and drag till the column or row end.

## Precentage %

    -cell formula : A
    -click hold the right corner of cell and drag till the column or row end.

## join Date

    -cell formula : =RANDBETWEEN(DATE(2015, 1, 1),DATE(2020, 12, 31))
    -click hold the right corner of cell and drag till the column or row end.

## STATUS

    -cell formula : =CHOOSE(RANDBETWEEN(1,3),"OPENED","CLOSED","TENTATIVE")
    -click hold the right corner of cell and drag till the column or row end.

## others

    -cell formula : =CHOOSE(RANDBETWEEN(1,3),"[{'val':10,'size':1,'x':12},{'val':3,'size':2,'x':78}]","[{'val':12,'size':2,'x':55},{'val':12,'size':2,'x':55}]","[{'val':3,'size':2,'x':78},{'val':12,'size':2,'x':55}]")

    -click hold the right corner of cell and drag till the column or row end.
