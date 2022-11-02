CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name STRING NOT NULL,
    username STRING NOT NULL,
    password STRING NOT NULL,
    contact STRING NOT NULL,
    email STRING NOT NULL,
    role STRING NOT NULL,
    status STRING NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    pname STRING NOT NULL,
    pcategory STRING NOT NULL,
    price INT NOT NULL,
    pcolor STRING NOT NULL,
    psize STRING NOT NULL,
    stocks INT NOT NULL,
    pdescript STRING NOT NULL,
    pstatus STRING NOT NULL,
    pimageurl STRING NOT NULL,
    psales INT NOT NULL
);

