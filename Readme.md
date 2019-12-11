Stream F36
---

Small experiments using NodeJS streams and Forma 36.

## Run

Provided that you have created a correct .env file (based on `.env.example`).

> :warning: **Please Note**
> 
> If you want to work with an in-memory database you need to use `NODE_ENV=local` and launch
> ```shell script
> npm run script:init-file-db
> npm run script:db-seed
> ```

```shell script
docker build -t streamf36-fe -f Client.Dockerfile .
docker build -t streamf36-api -f Server.Dockerfile .

docker run -p 80:80 streamf36-fe
docker run -p 1234:1234 streamf36-api
```

Or

```shell script
docker-compose up
```

## To-Do

If it's going to make sense keep on playing with these things, here's an incomplete list 
of problems to address:

* no test coverage whatsoever;
* the server needs a proper process management tool;
* frontend container does not allow client routing;
* logs are inconsistent and pretty much useless;
* folder structure make little sense (or at least is not conventional);
