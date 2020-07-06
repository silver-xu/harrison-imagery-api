CREATE TABLE auth_tokens(
  token_id INT AUTO_INCREMENT PRIMARY KEY,
  token NVARCHAR(255) NOT NULL UNIQUE,
  expiry_date DATETIME NOT NULL,
  user_id INT NOT NULL
);

CREATE TABLE image_status (
  image_status_code NVARCHAR(255) PRIMARY KEY,
  description NVARCHAR(255) NULL
);

CREATE TABLE images(
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  image_path NVARCHAR(255) NOT NULL,
  width INT NOT NULL,
  height INT NOT NULL,
  status_code NVARCHAR(255) NOT NULL,
  FOREIGN KEY (status_code) REFERENCES image_status(image_status_code)
);

CREATE TABLE label_status(
  label_status_code NVARCHAR(255) PRIMARY KEY,
  description NVARCHAR(255) NULL
);

CREATE TABLE labels(
  label_id INT AUTO_INCREMENT PRIMARY KEY,
  label NVARCHAR(255) NOT NULL,
  status_code NVARCHAR(255) NOT NULL,
  FOREIGN KEY (status_code) REFERENCES label_status(label_status_code)
);

CREATE TABLE image_label(
  image_label_id INT AUTO_INCREMENT PRIMARY KEY,
  image_id INT NOT NULL,
  label_id INT NOT NULL,
  x INT NOT NULL,
  y INT NOT NULL,
  width INT NOT NULL,
  height INT NOT NULL,
  update_date DATETIME NOT NULL,
  FOREIGN KEY (image_id) REFERENCES images(image_id),
  FOREIGN KEY (label_id) REFERENCES labels(label_id)
);