let datos = [];


document.addEventListener("DOMContentLoaded", function(){
    // make it as accordion for smaller screens
    if (window.innerWidth < 992) {
    
      // close all inner dropdowns when parent is closed
      document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
        everydropdown.addEventListener('hidden.bs.dropdown', function () {
          // after dropdown is hidden, then find all submenus
            this.querySelectorAll('.submenu').forEach(function(everysubmenu){
              // hide every submenu as well
              everysubmenu.style.display = 'none';
            });
        })
      });
    
      document.querySelectorAll('.dropdown-menu a').forEach(function(element){
        element.addEventListener('click', function (e) {
            let nextEl = this.nextElementSibling;
            if(nextEl && nextEl.classList.contains('submenu')) {	
              // prevent opening link if link needs to open dropdown
              e.preventDefault();
              if(nextEl.style.display == 'block'){
                nextEl.style.display = 'none';
              } else {
                nextEl.style.display = 'block';
              }
    
            }
        });
      })
    }
    // end if innerWidth
    }); 
    document.addEventListener("DOMContentLoaded", function() {
      // Despliegue del submenú al pasar el mouse
      document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown) {
        everydropdown.addEventListener('mouseover', function(e) {
          let el_link = this.querySelector('.dropdown-toggle');
          let el_menu = this.querySelector('.dropdown-menu');
          el_menu.classList.add('show');
          el_link.setAttribute('aria-expanded', 'true');
        });
        everydropdown.addEventListener('mouseleave', function(e) {
          let el_link = this.querySelector('.dropdown-toggle');
          let el_menu = this.querySelector('.dropdown-menu');
          el_menu.classList.remove('show');
          el_link.setAttribute('aria-expanded', 'false');
        });
      });
    });
    // DOMContentLoaded  end

    window.onload = () => {
      let pagaTotal = 0;
      let listaProductos = [];
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length == 2) return parts.pop().split(';').shift();
      }

      const agregar = document.getElementById("agregar");
      agregar.addEventListener("click", () => {
        const f = document.getElementById("product-form");
        const total = document.getElementById("total-purchase");

        fetch('/guardar-producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
          },
          body: JSON.stringify({
            'name': f['product-name'].value.trim(),
            'quantity': f['product-quantity'].value,
            'price': f['product-price'].value
          })
        })
          .then(response => {
            if (!response.ok) throw new Error('Error en la solicitud');
            return response.json();
          })
          .then(data => {
            console.log("Datos recibidos:", data);
            const table = document.getElementById("product-table-body");
            table.innerHTML += `
              <tr>
                  <td>${data.name}</td>
                  <td>${data.quantity}</td>
                  <td>${data.price}</td>
                  <td>${data.quantity * data.price}</td>
              </tr>
            `;
            pagaTotal += data.quantity * data.price;
            total.textContent = pagaTotal.toFixed(2);
            listaProductos.push(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
};