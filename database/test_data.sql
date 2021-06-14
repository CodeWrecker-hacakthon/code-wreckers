
INSERT INTO users ( id,first_name, last_name, other_names, email, phone_number, user_name, user_password, is_admin)
VALUES
('9b8f5abb-d128-42a7-acf2-b460191d3896', 'Kalule','Arthur','', 'kalsmicireporter@gmail.com','0772019937','admin','pbkdf2:sha256:50000$oqmPo4Xk$5c18d9801c82702b9b69a9730e835831a3fa1e8de84ac720843bead2617e4940',TRUE),
('6eb98d19-b89a-43d2-a8b4-e2be474bfc3f', 'userOne', 'userone','','userOne@ireporter.com','0773125678','user1','pbkdf2:sha256:50000$baKApXHV$6d1fb7908aa37a3f826d4d97f11f2c05e2f60effe973591b648a9244347bb59e',FALSE),
('ed2d0e68-59b8-44cb-af2c-bb8c30e10c3c','userTwo','lastTwo','','usertwo@ireporter.com','0774551567','user2','pbkdf2:sha256:50000$kbsFShh0$b291746b1aa6ad4718a98f2cc18ba62c1b1a37ae3715512cc27edc81abc9cc67',FALSE);

INSERT INTO incidents (id,title,comment, location,created_by,created_on,type,status)
VALUES
(
      '10df0c67-5f2b-4e5d-8b45-7357bbf3bebb',
      'Vestibulum blandit ligula a mollis ullamcorper.',
      'Class aptent taciti sociosqu ad litora torquent per conubi',
      (-44.000000,+174.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-03',
      'red-flag',
      'Draft'
),
(
      'df57bf19-1495-40aa-bbc3-5cc792a8f8f2',
      'Mauris vitae ultricies leo integer  vel risus commodo.',
      'Est placerat in egestas erat imperdiet sed euismod',
      (-43.000000,+144.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-03',
      'red-flag',
      'Resolved'
),
(
      '79bb7006-272e-4e0c-8253-117305466b4a',
      'leo vel fringilla. Egestas tellus rutru',
      'empus imperdiet nulla malesuada pellentesque elit eget gravida',
      (-43.000000,+144.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-03',
      'intervention',
      'Draft'
),
(
      '79cc7006-272e-4e0c-8253-117305466b4a',
      'leo vel fringilla. Egestas habib rutru',
      'empus imperdiet nulla sentongo pellentesque elit eget gravida',
      (-43.000000,+144.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-03',
      'intervention',
      'Draft'
),
(
      '79cc7006-224e-4e0c-8253-117305466b4a',
      'leo vel frngilla. Egestas habib rutru',
      'empus impdiet nulla sentongo pellentesque elit eget gravida',
      (-43.000000,+144.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-03',
      'intervention',
      'Resolved'
),
(
      '79bb7006-272e-4e0c-8253-117305466b7a',
      'leo vel fringilla. Egestas lorem rutru',
      'empus imperdiet nulla meuda pellentesque elit eget gravida',
      (-42.000000,+164.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-02-03',
      'intervention',
      'Resolved'
),
(
      '79bb7006-272e-4e0c-8253-117305466b6a',
      'leo vel dom manu. Egestas lorem rutru',
      'empus imperdiet akik meuda pellentembuesque elit eget gravida',
      (-42.000000,+164.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-02-03',
      'intervention',
      'Draft'
),
(
      'b7e7ddf0-3bdb-4932-888d-e262a54bda6a',
      'esse cillum dolore eu fugiat nulla pariatur',
      'Duis aute irure dolor in reprehenderit in voluptate velit.',
      (-23.000000,+134.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-05',
      'red-flag',
      'Draft'
),
(
      '68df1a76-80d0-4334-93f9-2f8d04a5ec8e',
      'Excepteur sint occaecat cupidatat.',
      'Elit ut aliquam purus sit amet luctus venenatis. Hac habitasse.',
      (-33.000000,+124.400000),
      '6eb98d19-b89a-43d2-a8b4-e2be474bfc3f',
      '2019-01-04',
      'red-flag',
      'Draft'
);

