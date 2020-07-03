INSERT INTO imagery.auth_tokens (token, expiry_date) VALUES ('3fbc8c169a574a11a8b4697809419a1c', DATE_ADD(NOW(), INTERVAL 8 HOUR));

INSERT INTO imagery.image_status (image_status_code, description) VALUES ('Created', 'The image has created but not yet labelled');
INSERT INTO imagery.image_status (image_status_code, description) VALUES ('Labelled', 'The image has been labelled');
INSERT INTO imagery.image_status (image_status_code, description) VALUES ('Removed', 'The image has been removed');

INSERT INTO imagery.label_status (label_status_code, description) VALUES ('InUse', 'The label is current in use');
INSERT INTO imagery.label_status (label_status_code, description) VALUES ('Removed', 'The label has been removed');