// Для использования RTK Query необходимо добавить два метода, чтобы получить data:
// createApi - создает API слайс. The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
// fetchBaseQuery - небольшая обертка метода fetch, которая упрощает отправку запросов
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    // Даем название нашему редусеру. Обычно называем так же, как и слайс
    reducerPath: "productsApi",
    // Указываем адрес, откуда будем получать данные, постить данные, или удалять данные. Указываем один ресурс без путей,
    // потому что далее мы укажем по какому конкретному пути или роуту мы будем что-то делать.
    // В нашем примере просто получаем данные (GET).
    // Фетчим с помощью fetchBaseQuery (небольшая обертка для встроенного в js метода fetch, которая упрощает работу с запросами).
    // baseUrl - наш адрес, по которому будем отправлять запросы. Без указания путей.
    baseQuery: fetchBaseQuery({baseUrl: "https://dummyjson.com/"}),
    // Создаем эндпоинты. Эндпоинты указывают какие запросы мы хотим сделать.
    // Они определяют взаимодействие с сервером. Эндпоинты возвращают callback-функцию, которая принимает в себя параметр, который называется 'builder'.
    // Возвращает эндпоинты, которые мы создаем. Для GET получим builder.query(), для мутаций (добавление, удаление, изменение) - builder.mutation()
    endpoints: (builder) => ({
        // Сделаем GET-запрос и назовем его getAllProducts. Далее у нас, соответственно будет хук use GetAllProducts Query.
        getAllProducts: builder.query({
            // query - указываем по какому конкретно пути получаем данные
            query: () => "products",
        }),
        // А теперь сделаем эндпоинт (метод - запрос) для получения конкретного продукта:
        getProduct: builder.query({
            // Для этого передадим аргумент в функцию, который назовем product
            // и укажем по get запросу какой конкретно
            query: (product) => `products/search?q=${product}`
        })
    }),
});

// Теперь экспортируем наш хук. Он автоматически создается и называется:
// название метода запроса (getAllProducts) + в начале 'use' и + в конце 'Query'
export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;