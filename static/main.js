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