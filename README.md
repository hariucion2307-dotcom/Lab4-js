                                             Министерство просвещения и исследований Республики Молдова  
                                                       Государственный   Университет Молдова 
                                                          Факультет  Математики и информатики 
                                                             Департамент “Информатики” 




                                                            
                                                            
                                                            
                                                                Лабораторная работа №4
                                                                По предмету: JavaScript
                                                           Тема:Продвинутые объекты в JavaScript


                                                                                                                      
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                            Выполнил: Харюк  Ион 
                                                                                                                            Группа I2502-ru 
                                                                                                                            Проверил:Calin N.


								                                          Цель работы:
Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование между классами. Освоить применение функций-конструкторов и опциональной цепочки для безопасного доступа к свойствам объектов.
                                                          Ход работы 
Шаг 1. Создание класса Item
Создадим класс Item, который представляет предмет в инвентаре.
Класс содержит основные свойства предмета и методы для получения информации и изменения веса.
Свойства:
name — название предмета
weight — вес
rarity — редкость (common, uncommon, rare, legendary)
 Методы:
getInfo() — возвращает информацию о предмете
setWeight(newWeight) — изменяет вес 
"use strict";
/**
 * Класс Item представляет предмет в инвентаре 
 */ 
class Item {
    /**
     * Создание предмета
     * @param {string} name - название предмета
     * @param {number} weight - вес предмета
     * @param {string} rarity - редкость(common, uncommon, rare, legendary) 
     */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }
    /**
     * Получение информации о предмете 
     * @returns {string} информация о предмете 
     */
    getInfo() {
        return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }
    /**
     * Изменение веса предмета 
     * @param {number} newWeight - новый вес
     */  
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}
Шаг 2. Создание класса Weapon
Создадим класс Weapon, который наследует Item и добавляет дополнительные свойства оружия.
Дополнительные свойства:
damage — урон
durability — прочность (0–100)
Методы: 
use() — уменьшает прочность на 10
repair() — восстанавливает прочность до 100
getInfo() — расширяет информацию о предмете
/**
 * Класс Weapon наследует Item 
 */
class Weapon extends Item {
    /**
     * Создание оружия
     *  @param {string} name - название
     * @param {number} weight - вес
     * @param {string} rarity - редкость
     * @param {number} damage - урон
     * @param {number} durability - прочность (0-100)
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }
    /**
     * Использования оружия 
     * уменьшает durability на 10
     */
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            if (this.durability < 0) {
                this.durability = 0;
            }
        }
    }
    /**
     * Ремонт оружия 
     * восстанавливает durability до 100
     */
    repair() {
        this.durability = 100;
    } 
    /**
     * Получение полной информации об оружии 
     * @returns {string} 
     */
    getInfo() {
        return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
    }
}  
Шаг 3. Тестирование программы
Были созданы объекты и проверена работа методов.
console.log("=== Тестирование классов ===");
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log("Новый вес:", sword.weight);
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log("Durability после использования:", bow.durability);
bow.repair();
console.log("Durability после ремонта:", bow.durability);
Шаг 4. Опциональная цепочка
Используем оператор ?. для безопасного доступа к свойствам.
console.log("=== Опциональная цепочка ===");
const player = {
    inventory: {
        weapon: bow
    }
};
//Без ошибки даже если свойства нет 
console.log(player.inventory?.weapon?.name);
console.log(player.inventory?.armor?.name); //undefined
Если свойства не существует (например armor), программа не выдаёт ошибку, а возвращает undefined.
Шаг 5. Функции-конструкторы
Перепишем классы в виде функций-конструкторов.
function ItemConstructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
    /**
     * Получение информации 
     * @returns {string}
     */
    this.getInfo = function () {
        return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    };
    /**
     * Изменение веса 
     * @param {number} newWeight 
     */ 
    this.setWeight = function (newWeight) {
        this.weight = newWeight;
    };
} 
/**
 * Функция-конструктор Weapon 
 * @param {string} name 
 * @param {number} weight
 * @param {string} rarity 
 * @param {number} damage
 * @param {number} durability 
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
    ItemConstructor.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
    /**
     * Использование оружия 
     */
    this.use = function () {
        if (this.durability > 0) {
            this.durability -= 10;
        }
    };
    /**
     * Ремонт оружия 
     */
    this.repair = function () {
        this.durability = 100;
    };
}
// Наследование 
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;
// Тест функций-конструкторов 
const axe = new WeaponConstructor("Battle Axe", 5.0, "legendary", 30, 100);
console.log(axe.getInfo());
axe.use();
console.log("Durability:", axe.durability);
axe.repair();
console.log("Durability после ремонта:", axe.durability);
Результат выполнения программы
В результате выполнения программы в консоли выводится информация о предметах, изменяется их вес, уменьшается прочность оружия и выполняется его восстановление.
Пример вывода:
=== Тестирование классов ===
Item: Steel Sword, Weight: 3.5, Rarity: rare
Новый вес: 4
Item: Longbow, Weight: 2, Rarity: uncommon, Damage: 15, Durability: 100
Durability после использования: 90
Durability после ремонта: 100
=== Опциональная цепочка ===
Longbow
undefined
=== Функции-конструкторы ===
Item: Battle Axe, Weight: 5, Rarity: legendary
Durability: 90
Durability после ремонта: 100
PS C:\Users\LENOVO\Desktop\Lab4-js>
                                                           Контрольные вопросы
1.Какое значение имеет this в методах класса?
Ключевое слово this в методах класса указывает на текущий  объект, внутри которого вызывается метод. Оно используется для доступа к свойствам и методам данного объекта.
Например: this.name означает имя текущего объекта.
2.Как работает модификатор доступа # в JavaScript?
Символ # используется для объявления приватных полей и методов класса. Такие свойства доступны только внутри класса и недоступны извне.
Пример:
class Test {
    #secret = 10;
    getSecret() {
        return this.#secret;
    }
}
Попытка обратиться к #secret вне класса приведёт к ошибке.
3.В чем разница между классами и функциями-конструкторами?
Клаccы - это современный способ создания объектов в JavaScript. Они обеспечивают более удобный синтаксис и поддержку наследования через extends.
Функции-конструкторы - это более старый способ создания объектов, использующий функции и прототипы.
Основные отличия:
Классы используют ключевое слово class;
Функции-конструкторы используют function;
Наследование в классах выполняется через extends;
В функциях - конструкторах используется prototype;
Классы делают код более читаемым.
                                                               Вывод
В ходе выполнения лабораторной работы были изучены классы и объекты в JavaScript. Были реализованы классы Item и Weapon, демонстрирующие механизм наследования. Также была выполнена реализация функций-конструкторов и использована опциональная цепочка для безопасного доступа к свойствам объектов. Полученные знания позволяют эффективно создавать и управлять объектами в JavaScript.  
