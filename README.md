
# Travelling-Pages

This a full-stack application which lets a user post his/her public or private stories/thoughts which anyone can read.
Tech Stack : Node, Express, HandleBars (Express Engine), MongoDB and Google OAuth 2.0


## API Reference

### Stories CRUD API

#### Get all stories

```http
  GET /story
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `string` | Gets all public stories |

#### Get Single Story

```http
  GET /story/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Gets a single stories

#### Post Story

```http
 POST /story/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Creates a single stories

#### Update Story

```http
 PUT /story/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Updates a single stories

#### Delete Story

```http
 DELETE /story/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Deletes a single stories


### USER API

#### Get all stories of a single USER

```http
  GET /user/:userId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Gets all public stories of a single user |
