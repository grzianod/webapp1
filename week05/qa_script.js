"use strict";

    let d = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let p = document.createElement('p');
    p.innerText = d;
    document.getElementById("time").appendChild(p);

    setInterval(() => p.innerText = dayjs().format("YYYY-MM-DD HH:mm:ss"), 1000);

    let rows = document.querySelectorAll('table tr');
    rows.forEach(row => {
        let b = row.querySelector('button');
        if (b) {
            b.addEventListener('click', event => {
                event.preventDefault();
                // console.log(event.target, "Clicked!");
                // console.log( row.children[3].innerText );
                const score = row.children[3].innerText;
                const newScore = parseInt(score) + 1;
                row.children[3].innerText = newScore;

            })
        }
    });


