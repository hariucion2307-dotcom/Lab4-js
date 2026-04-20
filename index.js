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
console.log("=== Опциональная цепочка ===");
const player = {
    inventory: {
        weapon: bow
    }
};
//Без ошибки даже если свойства нет 
console.log(player.inventory?.weapon?.name);
console.log(player.inventory?.armor?.name); //undefined
console.log("=== Функции-конструкторы ===");
/**
 * Функция-конструктор Item
 * @param {string} name 
 * @param {number} weight 
 * @param {string} rarity
 */
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
 


