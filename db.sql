CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name STRING NOT NULL,
    username STRING NOT NULL,
    password STRING NOT NULL,
    contact STRING NOT NULL,
    email STRING NOT NULL,
    role STRING NOT NULL,
    status STRING NOT NULL,
    active INT DEFAULT 1,
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
    pimageurl STRING NOT NULL,
    pimagename STRING NOT NULL,
    psales INT NOT NULL,
    active INT DEFAULT 1
    date_archive date DEFAULT NULL,
);

CREATE TABLE paidorders(
    id SERIAL PRIMARY KEY,
    cname STRING NOT NULL,
    product_id INT,
    st_name STRING NOT NULL,
    dmethod STRING NOT NULL,
    pmethod STRING NOT NULL,
    tprice INT NOT NULL,
    quantity INT NOT NULL,
    street STRING,
    barangay STRING,
    city STRING ,
    region STRING,
    country STRING,
    postal INT,
    contact INT NOT NULL,
    active INT DEFAULT 1,
    date_archive date DEFAULT NULL,
    date_added DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_product_id
        FOREIGN KEY(product_id)
            REFERENCES products(id)
);

