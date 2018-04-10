# Mockingbird - Simple HTTP mock server

WORK IN PROGRESS

### Install

For now, clone this repo and install globally with yarn or npm:

```sh
npm install -g
```

Now you have the mockingbird cli

### Usage

Prepare a json file with the following format:

```json
//mock.json
{
  8080: {
    "GET /numbers": [1, 2, 3, 4, 5]
  },
  8081: {
    "POST /login": {
      "token": "fkj34rDjhf",
      "logged": true
    }
  }
}
```

It is a dictionary with the port you want to follow where the values are dictionaries with the method and the path you want to mock with the respective response.
Now execute the following command on terminal:

```sh
mockingbird mock.json
```

If we do a GET on localhost:8080/numbers, we have [1, 2, 3, 4, 5] as response

### License

MIT
