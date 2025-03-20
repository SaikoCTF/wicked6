# Installation
1. Clone repository onto your machine.
2. Import data as needed (or just use the default data provided).

# Usage
To display leaderboard, open `index.html` in a web browser. 

The Pause button will:
1. Stop the scrolling and reset table rows to their initial position.
2. Stop the the next view from showing auotmatically.

The Play button will:
1. Restart scrolling for the current view. Note: There is a 1 second delay before scrolling commences.
2. Advance to the next view automatically after the current view has finished scrolling.

The Next/Prev buttons will advance one view forward or backward, respectively.

## Tips
- Recommended minimum display dimensions: 1300px x 900px.
- If window is resized, refresh the leaderboard for best results.

# Data
Data is read from `assets/scripts/data.js`.

## Assumptions
- Challenge ID's are unique.
- Challenge names are unique.
- Participant handles are unique.
- There are 6 challenges.*
- Maximum allowed challenge times will be no greater than 59:59 (MM:ss).*
- Participant completed challenge times will not exceed maximum allowed time for challenge.
- Maximum total of all challenge times will not exceed 99:59:59 (HH:MM:ss).*

*Only affects presentation elements

## Data Formatting
The data is formatted like JSON, but is stored in a JavaScript object named `data`.
```
data = {
  "challenges": [...],
  "participants": [...]
}
```

### Challenges
```
{
  "id": <Unique integer id>,
  "name": <Unique name string>,
  "allowed_time": <Maximum allowed time for challenge in format "MM:ss". Must include leading zeros.>
}
```

### Participants
```
{
  "handle": <Unique handle string>,
  "challenges": [
    {
      "id": <ID of completed challenge>,
      "time": <Time to complete challenge in format "MM:ss". Must include leading zeros.>
    },
    ...
  ]
}
