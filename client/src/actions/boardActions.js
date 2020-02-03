import axios from "axios";
import {
  FETCH_BOARD_DATA,
  FETCH_USER,
  UNLOAD_BOARD,
  UPDATE_BOARD
} from "./types";

export const fetchBoardData = boardId => async dispatch => {
  // Endpoints to GET a board, its lists, and its cards
  const boardEndpoint = `/api/v1/boards/${boardId}`;
  const listsEndpoint = `/api/v1/lists?boardHome=${boardId}`;
  const cardsEndpoint = `/api/v1/cards?boardHome=${boardId}`;

  // Run all GET requests concurrently with Promise.all()
  const endpoints = [boardEndpoint, listsEndpoint, cardsEndpoint];

  const boardDataPromises = endpoints.map(
    async endpoint => await axios.get(endpoint)
  );

  const [board, lists, cards] = await Promise.all(boardDataPromises);

  // Send board data to reducers
  const payload = {
    board: board.data.data,
    lists: lists.data.data,
    cards: cards.data.data
  };

  dispatch({ type: FETCH_BOARD_DATA, payload });
};

export const addBoard = title => async dispatch => {
  // POST new board
  await axios.post("/api/v1/boards", { title });

  // Get user data, as it will now reference the new board
  const user = await axios.get("/api/v1/users/current_user");

  // Send user to reducers
  dispatch({ type: FETCH_USER, payload: user.data });
};

// Unload board data from Redux when user navigates back to dashboard, etc.
export const unloadBoard = () => {
  return { type: UNLOAD_BOARD, payload: null };
};

export const updateBoard = (id, data) => async dispatch => {
  // Send PATCH request
  const board = await axios.patch(`/api/v1/boards/${id}`, data);

  // Send data to reducers
  dispatch({ type: UPDATE_BOARD, payload: board.data.data });
};