// Чтобы фетчить нашу data мы импортируем наш хук, полученный с помощью createApi, в любой компонент, где нам нужны данные. Например, здесь:
import { useGetAllProductsQuery, useGetProductQuery } from './features/apiSlice';

export const Data = () => {
    // Деструктируем наш хук и получаем:
    // data - наши данные, которые мы получаем
    // error - ошибка (передается в качетсве объекта и нужно привести в строку (полное описание) .toString())
    // isError - true/false можем вставлять кастомный компонент в зависимости от этого свойства
    // isLoading - true/false когда идет процесс загрузки данных (fetching...)
    // isFetching - true/false наш хук делает какой-либо сейчас запрос на сервер или нет
    // isSuccess - true/false успешно ли загрузил наш хук данные или нет (data уже должна быть определена)

    // Получим весь список продуктов
    const {data: allProductsData, error, isError, isLoading } = useGetAllProductsQuery();

    // Получим какой-либо один продукт. Для этого передадим аргумент в наш хук, который будем принимать и выводить данные по конкретному запросу:
    // products/search?q=${product} = products/search?q=iphone
    // получаем данные по конкретному запросу
    const {data: singleProductData} = useGetProductQuery("iphone");

    // Такой синтаксис позволяет нам называть переменные соответственно:
    // const {data: -> myNameOfVariable <-} = useApiHook();

    console.log(allProductsData);
    console.log(singleProductData);

    // Например, можем рендерить кастомное сообщение/спиннер, когда идет загрузка
    if (isLoading) return <h3>Loading...</h3>
    // или ошибка
    if (isError) return <h3>Something went wrong...</h3>
    
    return (
        <div>
            <h3>Data:</h3>
            <ul>
                {
                    singleProductData.products.map(({id, title, price, thumbnail}) => (
                        <li key={id}>
                            <img src={thumbnail} alt={title} width="180" />
                            <h5>{title}</h5>
                            <h6>${price}</h6>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};