# Hashtag Post Service
Implementing a service that keeps track of the hashtags ('#') used in posts.
<br>

## Topics
1. [Functional Requirements](#functional-requirements).
2. [Entities](#entities).
3. [High Level of API Designs](#high-level-of-api-designs).
4. [Flowchart](#flowchart).
5. [Current Architecture](#current-architecture).
6. [Future improvements in the Current Architecture](#future-improvements-in-the-current-architecture).
7. [Testing](#testing).
8. [Running project](#running-project).
<br/>
<br/>

### Functional Requirements
1. Creating new posts.
2. Scheduling a cron job which runs every 4 hours. It is responsible for updating each hashTag with its new posts' content by fetching new posts created in the last 4 hours.
3. Users can search for a hashtag and see its almost real time count. The search functionality is regex of finding any hashtags which contains searchTerm.
4. Users can also find top hash tags used.
<br>
<br>

### Entities
1. Post
```json
{
    "_id": {
        "$oid": "66611bfe3b96942d9c7e7baf"
    },
    "content": "adventures of #tim #tim",
    "createdAt": {
        "$date": {
            "$numberLong": "1717640190930"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1717640190930"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}
```

2. HashTag
```json
{
    "_id": {
        "$oid": "66611c0a3b96942d9c7e7bb7"
    },
    "keyword": "tim",
    "posts": [
        {
            "$oid": "66611bfe3b96942d9c7e7baf"
        },
        {
            "$oid": "66611c8e3b96942d9c7e7bd9"
        },
        {
            "$oid": "66611cc93b96942d9c7e7be6"
        }
    ],
    "count": {
        "$numberInt": "3"
    },
    "createdAt": {
        "$date": {
            "$numberLong": "1717640202412"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1717643522949"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}
```
<br>
<br>

### High Level of API Designs
1. Create a post:
```json
POST '/posts'
HEADER 'Content-Type: application/json'
BODY '{
    "content":"adventures of #tim #tim #tim all over the world of #tim # tim"
}'
RESPONSE
{
    "message": "Post successfully created with content adventures of #tim #tim #tim all over the world of #tim # tim"
}
```

2. Get all posts:
```
GET '/posts/all'
RESPONSE
{
    "data": {
        "posts": [
            "adventures of #tim #tim #tim all over the world of #tim # tim",
            "adventures of #tim #tim",
            "#adventuresofTIMtim"
        ]
    }
}
```

3. Recalibrating hashtags from recently created posts
```json
GET '/hashtags/recalibrate'
HEADER'Content-Type: application/json' 
RESPONSE
{
    "data": {
        "message": "Successfully recalibrated of posts of length 7 between Thu Jun 06 2024 04:25:42 GMT+0530 and Thu Jun 06 2024 08:25:42 GMT+0530",
        "hashTags": [
            {
                "keyword": "time",
                "count": 4
            },
            {
                "keyword": "tim",
                "count": 3
            },
            {
                "keyword": "alloftim",
                "count": 1
            }
        ]
    }
}
```

4. Get top hashtags used:
```json
GET '/hashtags/top?limit=3'
RESPONSE
{
    "data": {
        "hashTagsData": [
            {
                "keyword": "time",
                "count": 4,
                "posts": [
                    "only #time will #Tell",
                    "is there a way to make #everything #alright in #time?",
                    "is there a way to make #everything #alright in #time?",
                    "is there a way to make #everything #alright in #TIme?"
                ]
            },
            {
                "keyword": "everything",
                "count": 3,
                "posts": [
                    "is there a way to make #everything #alright in #time?",
                    "is there a way to make #everything #alright in #time?",
                    "is there a way to make #everything #alright in #TIme?"
                ]
            },
            {
                "keyword": "chain",
                "count": 3,
                "posts": [
                    "#hello#world#chain#of#hashtags",
                    "#hello#world#chain#of#hashtags",
                    "I am loving this song #off #the #chain #music #highOn #life"
                ]
            }
        ]
    }
}
```

4. Search for a hashtag
```json
GET '/hashtags/search?term=thing'
RESPONSE
{
    "data": {
        "hashTagsData": [
            {
                "keyword": "time",
                "count": 4,
                "posts": [
                    "only #time will #Tell",
                    "is there a way to make #everything #alright in #time?",
                    "is there a way to make #everything #alright in #time?",
                    "is there a way to make #everything #alright in #TIme?"
                ]
            },
            {
                "keyword": "tim",
                "count": 3,
                "posts": [
                    "adventures of #tim #tim",
                    "adventures of #tim #tim",
                    "adventures of #tim #tim #tim all over the world of #tim # tim"
                ]
            },
            {
                "keyword": "adventuresoftimtim",
                "count": 1,
                "posts": [
                    "#adventuresofTIMtim"
                ]
            },
            {
                "keyword": "alloftim",
                "count": 1,
                "posts": [
                    "adventures of #alloftim"
                ]
            }
        ]
    }
}
```

<br>
<br>

### Flowchart

<br>
<br>


### Current Architecture

<br>
<br>

### Future improvements in the Current Architecture

<br>
<br>

### Testing 
<br>
1. Create a post

<br/>
<br/>
2. Scheduler running in the background
<br/>

<br/>
<br/>
3. Searching a hashtag
<br/>

<br/>
<br>
4. Getting top 3 hashtags
<br/>

<br/>
<br>


## Running project

1. git clone https://github.com/JainManjari/PostsHashTagScheduler.git
2. npm install
3. npm start
4. Open browser and go to http://localhost:8000
<br>
<br>

## For further assistance please reach me @ manjarijain98@gmail.com