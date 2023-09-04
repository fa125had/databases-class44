# Exercise 1 : SQL Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members.
Because the manager is not an expert of Information Systems, she uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+

```

- ## What columns violate 1NF?

  - `food_code`: Not single valued columns (each column should have atomic value, no multiple values)</br>
  - `food_description`: Not single valued columns (each column should have atomic value, no multiple values)

- ## What entities do you recognize that could be extracted?

  - `Member`: Information related to each member (member_id, member_name, member_address).</br>
  - `Dinner`: Information about each dinner event (dinner_id, dinner_date).</br>
  - `Venue`: Information about each venue (venue_code, venue_description).</br>
  - `Food`: Information about each food item (food_code, food_description).</br>

- ## Name all the tables and columns that would make a 3NF compliant solution

- ### Member Table

  - `member_id` (Primary Key)
  - `member_name`
  - `member_address`

- ### Dinner Table

  - `dinner_id` (Primary Key)
  - `dinner_date`

- ### Venue Table

  - `venue_code` (Primary Key)
  - `venue_description`

- ### Food Table

  - `food_code` (Primary Key)
  - `food_description`

- ### Dinner_Member Table (Bridge Table for Dinner and Member)

  - `dinner_id` (Foreign Key)
  - `member_id` (Foreign Key)
  - **Primary Key** (`dinner_id`, `member_id`)

- ### Dinner_Venue Table (Bridge Table for Dinner and Venue)

  - `dinner_id` (Foreign Key)
  - `venue_code` (Foreign Key)
  - **Primary Key** (`dinner_id`, `venue_code`)

- ### Dinner_Food Table (Bridge Table for Dinner and Food)

  - `dinner_id` (Foreign Key)
  - `food_code` (Foreign Key)
  - **Primary Key** (`dinner_id`, `food_code`)
