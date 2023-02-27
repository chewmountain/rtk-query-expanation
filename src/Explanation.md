RTK Query is a powerful tool for managing asynchronous data fetching and state management in Redux applications. It is built on top of the Redux Toolkit (RTK) and provides a declarative API for defining data fetching and mutation logic.

RTK Query can handle a variety of use cases, such as fetching data from a REST API, polling for new data, paginating through large datasets, and handling optimistic updates. It also provides automatic caching and deduplication of network requests to improve performance and reduce the number of API calls.

Here are some examples of how RTK Query can be used:

<h2>Fetching Data (GET)</h2>
To fetch data from a REST API, you can define a query using the createApi function provided by RTK Query. Here's an example:

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const api = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
    }),
  }),
});

In this example, we are using the createApi function to define an API that fetches data from the JSONPlaceholder API. We define a single endpoint called getTodos, which fetches data from the /todos endpoint.

To use this query in our component, we can use the useGetTodosQuery hook provided by RTK Query:

import { useGetTodosQuery } from './api';

function Todos() {
  const { data, isLoading, isError } = useGetTodosQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

In this example, we are using the useGetTodosQuery hook to fetch data from the API and display it in a list. The hook returns an object with three properties: data, isLoading, and isError. We use these properties to conditionally render the loading state or an error message if something goes wrong.

<h2>Mutating Data (POST)</h2>
RTK Query also provides a way to mutate data by defining a mutation endpoint. Here's an example:

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const api = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
    }),
  }),
});

export const { useAddTodoMutation } = api;

In this example, we are defining a mutation endpoint called addTodo, which sends a POST request to the /todos endpoint with a todo object in the request body.

To use this mutation in our component, we can use the useAddTodoMutation hook provided by RTK Query:

import { useState } from 'react';
import { useAddTodoMutation } from './api';

function AddTodo() {
  const [title, setTitle] = useState('');
  const { isLoading, isError, mutate } = useAddTodoMutation();

const handleSubmit = async (event) => {
event.preventDefault();

try {
  await mutate({ title });
  setTitle('');
} catch (error) {
  console.log(error);
}
};

if (isLoading) {
return <div>Adding todo...</div>;
}

if (isError) {
return <div>Error adding todo</div>;
}

return (
<form onSubmit={handleSubmit}>
<input
type="text"
value={title}
onChange={(event) => setTitle(event.target.value)}
/>
<button type="submit">Add Todo</button>
</form>
);
}

In this example, we are using the `useAddTodoMutation` hook to add a new todo to the API. We define a form with an input for the todo title and a submit button. When the form is submitted, we call the `mutate` function with the todo object as an argument. We also use the `isLoading` and `isError` properties to conditionally render the loading state or an error message.

<h2>Using Pagination</h2>

RTK Query also provides a way to handle pagination by defining a `query` endpoint with a `paginate` option. Here's an example:

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const api = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (page = 1) => ({
        url: '/todos',
        params: {
          _page: page,
          _limit: 10,
        },
      }),
      transformResponse: (response) => ({
        data: response,
        nextPage: parseInt(response.headers.get('x-next-page')),
      }),
      paginate: true,
    }),
  }),
});

export const { useGetTodosQuery } = api;

In this example, we are defining a query endpoint called getTodos that fetches data from the /todos endpoint with pagination. We use the paginate option to tell RTK Query to automatically handle pagination based on the response headers.

To use this query in our component, we can use the useGetTodosQuery hook provided by RTK Query:

import { useState } from 'react';
import { useGetTodosQuery } from './api';

function Todos() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useGetTodosQuery(page);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <ul>
        {data.pages.map((page) =>
          page.data.map((todo) => <li key={todo.id}>{todo.title}</li>)
        )}
      </ul>
      {hasNextPage && (
        <button onClick={handleLoadMore} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </>
  );
}

In this example, we are using the useGetTodosQuery hook to fetch paginated data from the API and display it in a list. We define a state variable called page to keep track of the current page number. We use the data property to render the list of todos using the map method.

We also use the isFetchingNextPage property to disable the "Load more" button while the next page is being fetched. Finally, we use the hasNextPage property to conditionally render the "Load more" button only if there are more pages to fetch.

These examples show just a few of the many ways you can use RTK Query to handle data fetching and caching in your React applications. RTK Query provides a powerful and flexible solution for managing API requests that can save you a lot of time and effort in the long run.