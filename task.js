function cachingDecoratorNew(func) {
  let cache = [];

function wrapper(...args) {
    const hash = args.join(','); // получаем правильный хэш
    let idx = cache.findIndex((item)=> item.hash === hash ); // ищем элемент, хэш которого равен нашему хэшу
    if (idx !== -1 ) { // если элемент не найден
        console.log("Из кэша: " + cache[idx].value); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
        return "Из кэша: " + cache[idx].value;
    }

    let result = func(...args); // в кэше результата нет - придётся считать
    cache.push(hash, result) ; // добавляем элемент с правильной структурой
    if (cache.length > 5) { 
      cache.shift() // если слишком много элементов в кэше надо удалить самый старый (первый) 
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;  
  }
  return wrapper;
}


function debounceDecoratorNew (func,ms){
  let isThrottled = false

  function wrapper (){

      if (isThrottled) { 
          return;
      }

      func.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
          isThrottled = false;
      },ms)
  }
  return wrapper
}

function debounceDecorator2(func,ms){
  let isThrottled = false
  function wrapper (){
      if (isThrottled) { 
          wrapper.count +=1
          return;
      }

      func.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
          isThrottled = false;
          wrapper.count +=1
      },ms)
  }

  wrapper.count = 0
  return wrapper
}