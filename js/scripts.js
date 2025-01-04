/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Constants for orbital radii in kilometers (Earth's orbital radius and other planets' average orbital radii)
const planetRadii = {
    earth: 149.6e6,    // Earth orbital radius around the Sun (in km)
    mercury: 57.91e6,  // Mercury orbital radius around the Sun (in km)
    venus: 108.2e6,    // Venus orbital radius around the Sun (in km)
    mars: 227.9e6,     // Mars orbital radius around the Sun (in km)
    jupiter: 778.6e6,  // Jupiter orbital radius around the Sun (in km)
    saturn: 1.429e9,   // Saturn orbital radius around the Sun (in km)
    uranus: 2.87e9,    // Uranus orbital radius around the Sun (in km)
    neptune: 4.5e9     // Neptune orbital radius around the Sun (in km)
};

// Current known distances between Earth and the planets (in km)
const distances = {
    mercury: 178954891,
    venus: 109009530,
    mars: 97275287,
    jupiter: 630605366,
    saturn: 1506378955,
    uranus: 2828951825,
    neptune: 4511769426
};

// Approximate the orbital period (in days) for each planet
const orbitalPeriods = {
    earth: 365,       // Earth orbital period (in days)
    mercury: 88,      // Mercury orbital period (in days)
    venus: 225,       // Venus orbital period (in days)
    mars: 687,        // Mars orbital period (in days)
    jupiter: 4333,    // Jupiter orbital period (in days)
    saturn: 10759,    // Saturn orbital period (in days)
    uranus: 30687,    // Uranus orbital period (in days)
    neptune: 60190    // Neptune orbital period (in days)
};

// Function to calculate the distance between Earth and each planet
function calculatePlanetDistance(planet) {
    // Time in milliseconds since epoch
    const currentTime = new Date().getTime();
    
    // Calculate the angle of Earth and the given planet in their respective orbits
    const earthAngle = 2 * Math.PI * (currentTime % (orbitalPeriods.earth * 24 * 60 * 60 * 1000)) / (orbitalPeriods.earth * 24 * 60 * 60 * 1000); 
    const planetAngle = 2 * Math.PI * (currentTime % (orbitalPeriods[planet] * 24 * 60 * 60 * 1000)) / (orbitalPeriods[planet] * 24 * 60 * 60 * 1000); 

    // Calculate the distance using the law of cosines
    const distance = Math.sqrt(
        Math.pow(planetRadii.earth, 2) + Math.pow(planetRadii[planet], 2) - 2 * planetRadii.earth * planetRadii[planet] * Math.cos(earthAngle - planetAngle)
    );

    return distance; // Return calculated distance in km
}

// Function to update the distance every second with commas for each planet
function updateDistances() {
    const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    
    planets.forEach(planet => {
        const distance = calculatePlanetDistance(planet);
        
        // Format the distance with commas for thousands separator
        const formattedDistance = distance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // Update the text content for each planet
        document.getElementById(`${planet}-distance`).textContent = `${formattedDistance} km`;
    });
}

// Update the distances every second (1000 milliseconds)
setInterval(updateDistances, 1000);

// Initial update on page load
updateDistances();

