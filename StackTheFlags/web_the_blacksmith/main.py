from random import choice
from uuid import uuid4
from dataclasses import dataclass
from collections import namedtuple
from typing import List
from functools import partial

from fastapi import FastAPI, HTTPException, Query

LOYALTY_SYSTEM_ACTIVE = False
FLAG = open("/app/flag.txt").read().strip()


app = FastAPI(docs_url=None, redoc_url=None)

Weapon = namedtuple("Weapon", ["name", "price", "loyalty_points"])
RestrictedLoyalty = namedtuple("RestrictedLoyalty", ["fame", "point_history"])

SHOP = {
    "customers": [],
    "inventory": {
        "regular": (
            Weapon("brokensword", 5, 0),
            Weapon("woodensword", 5, 1),
            Weapon("stonesword", 10, 2),
            Weapon("ironsword", 50, 10),
            Weapon("goldsword", 100, 20),
            Weapon("diamondsword", 500, 100),
        ),
        "exclusive": (Weapon("flagsword", 5, 0),),
    },
}


@dataclass
class Loyalty:
    fame: int
    point_history: List[int]


@dataclass
class Customer:
    id: str
    gold: int
    loyalty: Loyalty | RestrictedLoyalty

    @property
    def tier(self):
        if (self.loyalty.fame + sum(self.loyalty.point_history)) > 1337:
            return "exclusive"
        return "regular"

    @staticmethod
    def index_from_id(id):
        for idx, customer in enumerate(SHOP["customers"]):
            if customer.id == id:
                return idx
        return None


def weapon_from_name(weapons, name):
    for weapon in weapons:
        if weapon.name == name:
            return weapon
    return None


@app.get("/customer/new")
def register():
    if LOYALTY_SYSTEM_ACTIVE:
        customer = Customer(id=uuid4().hex, gold=5, loyalty=Loyalty(1, []))
    else:
        # Ensure loyalty immutable
        customer = Customer(
            id=uuid4().hex, gold=5, loyalty=RestrictedLoyalty(1, [])
        )

    SHOP["customers"].append(customer)

    return {"id": customer.id}


@app.get("/battle")
def battle(customer_id=""):
    customer_idx = Customer.index_from_id(customer_id)
    if customer_idx is None:
        raise HTTPException(status_code=401)

    is_victorious = choice([True, False])

    if is_victorious and LOYALTY_SYSTEM_ACTIVE:
        SHOP["customers"][customer_idx].loyalty.fame += 1

    message = "You won!" if is_victorious else "You lost!"

    return {"result": message}


@app.get("/")
def index(customer_id=""):
    customer = Customer.index_from_id(customer_id)

    if customer is None:
        HTTPException(status_code=401)

    shop_items = [
        *SHOP["inventory"]["exclusive"],
        *SHOP["inventory"]["regular"],
    ]
    if LOYALTY_SYSTEM_ACTIVE:
        return shop_items

    return [item for item in shop_items if item.loyalty_points == 0]


@app.get("/buy")
def buy_item(customer_id="", items: list[str] | None = Query(default=[])):
    customer_idx = Customer.index_from_id(customer_id)

    if customer_idx is None:
        raise HTTPException(status_code=401)

    if items is None:
        return {"purchased": ""}

    match SHOP["customers"][customer_idx].tier:
        case "regular":
            get_weapon = partial(
                weapon_from_name, SHOP["inventory"]["regular"]
            )
        case "exclusive":
            get_weapon = partial(
                weapon_from_name,
                [
                    *SHOP["inventory"]["regular"],
                    *SHOP["inventory"]["exclusive"],
                ],
            )
        case _:
            raise HTTPException(status_code=500)

    cart = []
    for item in items:
        weapon = get_weapon(item)
        if weapon is None:
            raise HTTPException(status_code=404)
        cart.append(weapon)

    total_price = 0
    point_history = []
    for item in cart:
        if item.price > SHOP["customers"][customer_idx].gold:
            raise HTTPException(status_code=403)
        total_price += item.price
        if item.loyalty_points > 0:
            point_history += [item.loyalty_points]

    try:
        if len(point_history) > 0:
            SHOP["customers"][
                customer_idx
            ].loyalty.point_history += point_history
        if SHOP["customers"][customer_idx].gold < total_price:
            raise HTTPException(status_code=403)
        SHOP["customers"][customer_idx].gold -= total_price
    except:
        raise HTTPException(status_code=403)

    if "flagsword" in [weapon.name for weapon in cart]:
        return {"purchased": FLAG}

    return {"purchased": cart}
