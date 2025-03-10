document.getElementById("submit-btn").addEventListener("click", function() {
    const countryName = document.getElementById("country").value.trim();

    if (!countryName) return alert("Enter a country name");

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            const { capital = "N/A", population, region, flags, borders = [] } = country;

            document.getElementById("country-description").innerHTML = `
                <strong>Capital:</strong> ${capital} <br>
                <strong>Population:</strong> ${population.toLocaleString()} <br>
                <strong>Region:</strong> ${region} <br>
                <strong>Flag:</strong> <img src="${flags.png}" alt="Flag" style="width: 150px;">
            `;

            const borderList = document.getElementById("bordering-list");
            if (borders.length > 0) {
                fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`)
                    .then(response => response.json())
                    .then(borderData => {
                        borderList.innerHTML = borderData.map(border => `
                            <li><strong>${border.name.common}:</strong> <img src="${border.flags.png}" alt="Flag" style="width: 50px;"></li>
                        `).join('');
                    });
            } else {
                borderList.innerHTML = "<p>No bordering countries found.</p>";
            }
        })
        .catch(() => alert("Country not found"));
});
