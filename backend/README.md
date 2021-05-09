## General API Information
* The base endpoint is: **http://localhost:3000**
* All endpoints return either a JSON object or array.

### Authentication
**Request:**
```javascript
POST /auth/login

{
  "username": ...,
  "password": ...,
  "role": admin or regular
}
```
**Response:**
```javascript
{
 'status': 'success',
 'message': 'Successfully logged in.',
 'auth_token': bearer token
 }
```


**Request:**
```javascript
POST /auth/register
{
  "first_name": ...,
  "last_name": ...,
  "date_of_birth": yyyy-mm-dd,
  "gender": M or F,
  "country": ...,
  "address": ...,
  "email": ...,
  "password": ...
}
```
**Response:**
```javascript
{
    'status': 'success',
    'message': 'Successfully registered.'
}
```




### Prediction
**Request:**

```javascript
POST /prediction/fast_prediction

{
    "data": base64 encoded audio file,
    If logged in:
    "date": yyyy-mm-dd,
    "travel_abroad_14days": true or false,
    "contact_with_infected_person_14days": true or false,
    "visited_healthcare_facility_14days": true or false,
    "fever": true or false,
    "breathing_difficulty": true or false,
    "sore_throat": true or false,
    "cough": true or false,
    "no_taste": true or false,
    "no_smell": true or false,
    "headache": true or false
    
}
```
**Response:**
```javascript
{
    "results": [No covid percentage, Covid percentage]
 }
```


**Request:**

```javascript
POST /prediction/accurate_prediction

{
    "data": [base64 encoded audio files],
    If logged in:
    "date": yyyy-mm-dd,
    "travel_abroad_14days": true or false,
    "contact_with_infected_person_14days": true or false,
    "visited_healthcare_facility_14days": true or false,
    "fever": true or false,
    "breathing_difficulty": true or false,
    "sore_throat": true or false,
    "cough": true or false,
    "no_taste": true or false,
    "no_smell": true or false,
    "headache": true or false
    
}
```
**Response:**
```javascript
{
    "results": [No covid percentage, Covid percentage]
 }
```

### Medical

**Request:**

```javascript
POST /medical/upload_medical_test
{
        "data": base64 encoded audio file,
        "test_result" = 0 for No covid and 1 for Covid
}
```
**Response:**
```javascript
{
    "results": "success"
}
```


### Reports
**Request:**

```javascript
GET /reports

```
**Response:**
```javascript
{
      'status': 'success',
      'message': 'Successfully retrieved reports.',
      'covid_reports': reports list
}
```


### Statistics
**Request:**

```javascript
GET /admin/statistics/time

```
**Response:**
```javascript
{
        'status': 'success',
        'covidTime': [[time,covid%],[time,covid%],...]
}
```



**Request:**

```javascript
GET /admin/statistics/country/<country>

```
**Response:**
```javascript
{
        'status': 'success',
        'country': country,
        'covid': avg covid%
}
```


**Request:**

```javascript
GET /admin/statistics/factor/<factor>

```
**Response:**
```javascript
{
        'status': 'success',
        'ifTrue': avg covid%,
        'ifFalse': avg covid%
}