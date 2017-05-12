FORMAT: 1A
HOST: https://ramadan-cal-orabi.herokuapp.com

# Ramadan Cal API

it's a simple API allowing flowics to get a city prayers time for today and tomorrow.

## City Collection [/city]

### List All Cities [GET]

+ Response 200 (application/json)

        [
            {
                "_id": "59012a5175657f3f0b9798f3",
                "name": "مكة المكرمة",
                "cal": {
                    "1": {
                        "day": "1",
                        "Fajr": "04:13",
                        "Sunrise": "05:38",
                        "Dhuhr": "12:18",
                        "Asr": "03:33",
                        "Sunset": "",
                        "Maghrib": "06:58",
                        "Isha": "08:58",
                        "Imsak": "",
                        "Midnight": ""
                    }
                }
            }
        ]

### Create a New City [POST]

If you authoraized you may create a new city with a calendar as the name 
is the city name and the cal object is the calendar so as we see in the example: 
`"cal": { "1": { "day": "6", "Fajr": "04:13", ...... }}`  
`"1"` indicates to the Gregorian day,  
`"day": "6"` indicates to the Hijri day

+ Request (application/json)

            {
                "name": "مكة المكرمة",
                "cal": {
                    "1": {
                        "day": "6",
                        "Fajr": "04:13",
                        "Sunrise": "05:38",
                        "Dhuhr": "12:18",
                        "Asr": "03:33",
                        "Sunset": "",
                        "Maghrib": "06:58",
                        "Isha": "08:58",
                        "Imsak": "",
                        "Midnight": ""
                    }, "2": {
                        "day": "7",
                        "Fajr": "04:13",
                        "Sunrise": "05:38",
                        "Dhuhr": "12:18",
                        "Asr": "03:33",
                        "Sunset": "",
                        "Maghrib": "06:58",
                        "Isha": "08:58",
                        "Imsak": "",
                        "Midnight": ""
                    }
                }
            }

+ Response 201 (application/json)

    + Headers

            Location: /

    + Body

            {
                
            }
