- POST /game/create 
  - BODY username
  - RETURNS gameId
  - ACTION create new entry in games table (player1 = username, gameId = gameId, player2 = null, board = defaultBoardString)
- POST /game/:gameId/join
  - BODY username, gameId
  - RETURNS gameId
  - ACTION update entry in games table (player2 = username)
- POST /game/:gameId/start
  - BODY nothing
  - RETURNS nothing
  - ACTION starts socket server


1. User lands in main page
2. User has to decide if create or join game
   1. User creates game
      1. Username is sent
      2. New entry in DB is created
      3. User gets gameId in return
      4. User is redirected to game page
      5. Request is sent to start game
      6. Socket connection is created
      7. Game is not starting, waiting for 2nd player
   2. User joins game
      1. Username and game id is sent
      2. Entry in DB is updated
      3. User is redirected to game page
      4. Request is sent to join existing socket connection
      5. Game is starting