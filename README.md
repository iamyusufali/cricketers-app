# Crickters app

> Make sure you are using Node 18+ and npm 9+ versions

## Running the app

#### Install dependencies

```
npm i
```

#### Start application

```bash
npm run dev
```

> The app should be up & running now at http://localhost:3000

## Features implemented

### Screen: Home

- Entry point of the app
- Button to navigate to Cricketers list

### Screen: Cricketers

- Display the list of cricketers
- Pagination of size 10
- Filter by type
- Ability to search by name
- Screen retains the filter & search criteria on screen refresh
- Cricketer name is a link to open the Cricketer details screen

### Screen: Cricketer Details

- Details of the cricketer
- Back to Cricketers button
- 5 similar matching players displayed
