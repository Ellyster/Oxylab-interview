# Oxylab Interview

## API

The API should:

- Have authorization (you can choose the type and complexity yourself).
- Track usage (user's no. of requests and traffic).
- Expose at least a single POST endpoint that must call the mocked screapper and returns its response, the requester will provide a URL in body.

### Scrapper

The Scrapper must be mocked using the following function (or equivalent):

```python
def scrape(url):
    if random.random() < 0.01:
        raise Exception("Failed to scrape")
        
    time.sleep(random.randint(2, 10))
    return "<html><body><h1>Scraped HTML</h1></body></html>"
```

## Interview tasks

- [x] Create a working API using any languange that you want
- [x] Provide a repository on Github with code
- [x] Deploy it to the GCP sandobox project using Terraform

## How to run

You can either use the makefile to deploy it to GCP, or run it locally following the instructions below.

### 1. Create docker image

```bash
docker build -t oxylab-alonso-interview:v1 .
```

### 2. Run docker image

```bash
docker run -p 8080:8080 -td oxylab-alonso-interview:v1
```

### 3. Check the documentation

Visit [http://localhost:8080/swagger](http://localhost:8080/swagger) to check the API documentation in Swagger.

### 3. Use the endopoints

Use a the [Swagger](http://localhost:8080/swagger) page or a software such as [Postman](https://www.postman.com) to try the API with any of the following x-api-key:

| Tenant            | API key example                      |
|:------------------|:-------------------------------------|
| Datum Corporation | 351e7159-b53f-421c-be31-34daeee8032d |
| Contoso Corp.     | 46f7422c-982e-4074-9063-148b666e8981 |
| Northwind Traders | e6fd7b4c-8d7a-445a-924b-8ec31092cc15 |
| Southbridge Video | 3f59d304-39a4-4012-82e4-dbb486c19e4a |
