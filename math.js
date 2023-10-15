function calculate() {
    let damage = document.getElementById("damageField").value;
    let defence = document.getElementById("defenceField").value;
    let level = document.getElementById("levelField").value;
    let power = document.getElementById("powerField").value;
    let att = [];
    for (let i = 5; i <= 50; i++) {
        att.push(i);
    }
    let weather = 1;
    let crit = (document.getElementById("optCrit").selected) ? 2 : 1
    let stab = (document.getElementById("optSTAB").selected) ? 1.5 : 1
    let randomLow = 0.85;
    let randomHigh = 1;

    let typeOne = 1;
    let listTypeOne = document.getElementsByName("typeOne");
    for (let i = 0; i < listTypeOne.length; i++) {
        if (listTypeOne[i].checked) {
            typeOne = listTypeOne[i].value;
        }
    }
    let typeTwo = 1;
    let listTypeTwo = document.getElementsByName("typeTwo");
    for (let i = 0; i < listTypeTwo.length; i++) {
        if (listTypeTwo[i].checked) {
            typeOne = listTypeTwo[i].value;
        }
    }

    // Stat Modifiers
    let base = [];
    for (let i = 11; i <= 255; i++) {
        base.push(i);
    }
    let lowIV = 0;
    let highIV = 31;
    let effortValue = 0;
    let natureHigh = 1.1;
    let natureLow = 0.9;

    // Damage Calculation
    let baseDamage = [];
    for (let i = 0; i < att.length; i++) {
        baseDamage.push(Math.floor((2 * level / 5 + 2) * power * att[i] / defence / 50))
    }
    let damageValOne = [];
    for (let i = 0; i < baseDamage.length; i++) {
        damageValOne.push(Math.floor(baseDamage[i] * weather + 2))
    }
    let damageVal = [];
    for (let i = 0; i < damageValOne.length; i++) {
        damageVal.push(Math.floor(damageValOne[i] * crit))
    }


    let firstDamageLow = [];
    for (let i = 0; i < damageVal.length; i++) {
        firstDamageLow.push(Math.floor(damageVal[i] * randomLow))
    }
    let secondDamageLow = []
    for (let i = 0; i < firstDamageLow.length; i++) {
        secondDamageLow.push(Math.floor(firstDamageLow[i] * stab))
    }
    let thirdDamageLow = []
    for (let i = 0; i < secondDamageLow.length; i++) {
        thirdDamageLow.push(Math.floor(secondDamageLow[i] * typeOne))
    }
    let damageLow = []
    for (let i = 0; i < thirdDamageLow.length; i++) {
        damageLow.push(Math.floor(thirdDamageLow[i] * typeTwo))
    }


    let firstDamageHigh = [];
    for (let i = 0; i < damageVal.length; i++) {
        firstDamageHigh.push(Math.floor(damageVal[i] * randomHigh))
    }
    let secondDamageHigh = []
    for (let i = 0; i < firstDamageLow.length; i++) {
        secondDamageHigh.push(Math.floor(firstDamageLow[i] * stab))
    }
    let thirdDamageHigh = []
    for (let i = 0; i < secondDamageHigh.length; i++) {
        thirdDamageHigh.push(Math.floor(secondDamageHigh[i] * typeOne))
    }
    let damageHigh = []
    for (let i = 0; i < thirdDamageHigh.length; i++) {
        damageHigh.push(Math.floor(thirdDamageHigh[i] * typeTwo))
    }

    let baseAttLow = [];
    for (let i = 0; i < base.length; i++) {
        baseAttLow.push(
            Math.floor((Math.floor((2 * base[i] + lowIV + Math.floor(effortValue / 4)) * level / 100) + 5) * natureLow)
        )
    }
    let baseAttHigh = [];
    for (let i = 0; i < base.length; i++) {
        baseAttHigh.push(
            Math.floor((Math.floor((2 * base[i] + highIV + Math.floor(effortValue / 4)) * level / 100) + 5) * natureHigh)
        )
    }

    let damageIndexLow = 0;
    for (let i = 0; i < damageHigh.length; i++) {
        if (damageHigh[i] == damage) {
            damageIndexLow = i
        }
    }
    let damageIndexHigh = 0;
    for (let i = 0; i < damageLow.length; i++) {
        if (damageLow[i] == damage) {
            damageIndexHigh = i
        }
    }
    var minAtt = att[damageIndexLow];
    var maxAtt = att[damageIndexHigh];

    let attIndexLow = 0;
    for (let i = 0; i < baseAttHigh.length; i++) {
        if (baseAttHigh[i] == minAtt) {
            attIndexLow = i
        }
    }
    var minBaseAtt = base[attIndexLow];
    if (minBaseAtt < 0) {
        minBaseAtt = 1;
    }
    let attIndexHigh = 0;
    for (let i = 0; i < baseAttLow.length; i++) {
        if (baseAttLow[i] == maxAtt) {
            attIndexHigh = i
        }
    }
    var maxBaseAtt = base[attIndexHigh];

    document.getElementById("output").innerText = `
        Attacking Stat is: ${minAtt} - ${maxAtt} \n
        Base Stat is: ${minBaseAtt} - ${maxBaseAtt}
    `;

}





function calc2() {
    let InputDamage = document.getElementById("damageField").value;
    let Def = document.getElementById("defenceField").value;
    let Level = document.getElementById("levelField").value;
    let Power = document.getElementById("powerField").value;
    let Crit = (document.getElementById("optCrit").selected) ? 2 : 1
    let STAB = (document.getElementById("optSTAB").selected) ? 1.5 : 1
    let Type1 = 1;
    let listTypeOne = document.getElementsByName("typeOne");
    for (let i = 0; i < listTypeOne.length; i++) {
        if (listTypeOne[i].checked) {
            typeOne = listTypeOne[i].value;
        }
    }
    let Type2 = 1;
    let listTypeTwo = document.getElementsByName("typeTwo");
    for (let i = 0; i < listTypeTwo.length; i++) {
        if (listTypeTwo[i].checked) {
            typeOne = listTypeTwo[i].value;
        }
    }


    // Damage modifiers
    var Weather = 1;
    var random_low = 0.85;
    var random_high = 1;

    // Stat modifiers
    var Base = Array.from({ length: 245 }, (_, i) => i + 11); // Creates an array from 11 to 255
    var IVLow = 0;
    var IVHigh = 31;
    var EV = 0;
    var NatureHigh = 1.1;
    var NatureLow = 0.9;
    var Att = Array.from({ length: 46 }, (_, i) => i + 5); // Creates an array from 5 to 50

    // Damage calculation
    var BaseDamage = Math.floor((2 * Level / 5 + 2) * Power * Att[0] / Def / 50);
    var Damage = Math.floor(BaseDamage * Weather + 2);
    Damage = Math.floor(Damage * Crit);

    var DamageLow = Math.floor(Damage * random_low);
    DamageLow = Math.floor(DamageLow * STAB);
    DamageLow = Math.floor(DamageLow * Type1);
    DamageLow = Math.floor(DamageLow * Type2);

    var DamageHigh = Math.floor(Damage * random_high);
    DamageHigh = Math.floor(DamageHigh * STAB);
    DamageHigh = Math.floor(DamageHigh * Type1);
    DamageHigh = Math.floor(DamageHigh * Type2);

    // Base stat calculation
    var BaseAttLow = Math.floor((Math.floor((2 * Base + IVLow + Math.floor(EV / 4)) * Level / 100) + 5) * NatureLow);
    var BaseAttHigh = Math.floor((Math.floor((2 * Base + IVHigh + Math.floor(EV / 4)) * Level / 100) + 5) * NatureHigh);

    var DamageIndLow = DamageHigh === InputDamage;
    var minAtt = Math.min(...Att.filter((att, i) => DamageIndLow[i]));

    var DamageIndHigh = DamageLow === InputDamage;
    var maxAtt = Math.max(...Att.filter((att, i) => DamageIndHigh[i]));


    console.log(BaseAttHigh);
    var AttIndLow = BaseAttHigh.findIndex(att => att === minAtt);
    var minBaseAtt = Math.min(...Base.filter((base, i) => AttIndLow[i]));

    if (isNaN(minBaseAtt)) {
        minBaseAtt = 1;
    }

    var AttIndHigh = BaseAttLow.findIndex(att => att === maxAtt);
    var maxBaseAtt = Math.max(...Base.filter((base, i) => AttIndHigh[i]));

    console.log("minBaseAtt: " + minBaseAtt);
    console.log("maxBaseAtt: " + maxBaseAtt);

    document.getElementById("output").innerText = `
    Attacking Stat is: ${minAtt} - ${maxAtt} \n
    Base Stat is: ${minBaseAtt} - ${maxBaseAtt}
`;
}