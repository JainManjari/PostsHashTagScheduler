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
```
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
```
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
```
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
```
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
<img width="802" alt="Screenshot 2024-06-06 at 8 57 42 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/37246755-0bbd-4d66-b4e8-7966706e428c">
<br>
<br>


### Current Architecture
<img width="1127" alt="Screenshot 2024-06-06 at 9 04 10 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/57b58ff0-009d-43cf-881a-7f1d35e70b7b">
<br>
<br>

### Future improvements in the Current Architecture
<img width="1104" alt="Screenshot 2024-06-06 at 9 17 45 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/d5d98537-4a3e-4406-b595-4051f4fd4196">
<br>
<br>

### Testing 
<br>
1. Create a post
<br>
<img width="1004" alt="Screenshot 2024-06-06 at 9 18 08 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/25ebeb1c-7043-4a14-a040-e9e90068a296">
<br/>
<br/>
2. Scheduler running in the background
<br/>
<img width="1288" alt="Screenshot 2024-06-06 at 9 18 38 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/1cdfa8df-78a2-4367-870d-c09f5fd5e931">
<br/>
<br/>
3. Searching for a hashtag
<br/>
<img width="830" alt="Screenshot 2024-06-06 at 9 24 09 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/00a93880-5876-49af-8320-c3e0449d859f">
<br/>
<br>
4. Getting the top 3 hashtags
<br/>
<img width="955" alt="Screenshot 2024-06-06 at 9 24 48 AM" src="https://github.com/JainManjari/PostsHashTagScheduler/assets/54873596/57892bcb-86e5-4553-9726-e446977d30ba">
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
