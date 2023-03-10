$(() => {
  const input = $("ul li input[type='checkbox']")
  const search = $("div.amenities h4")
  let variable = []
  let searval = []
  //jquery
  input.on("click", (e) => {
    let data = e.target
    if (data.checked == true) {
      variable.push(data.attributes['data-id'].value)
      searval.push(data.attributes['data-name'].value)
    } else {
      variable = variable.filter((val) => {
        if (val != data.attributes['data-id'].value) {
          return true
        }
      })
      searval = searval.filter((val) => {
        if (val != data.attributes['data-name'].value) {
          return true
        }
      })
    }
    search.text(searval.join(', '))
  })

  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  function ud(val) {
    if (val == undefined) {
      return ""
    }else {
      return val
    }
  }
  const arr = {};
  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search",
    data: "{}",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
  }).done(function (data) {
    for (const place of data) {
      const template =
        `
      <article>
	  <div class="title_box">
	    <h2>${ud(place.name)}</h2>
	    <div class="price_by_night">$${ud(place.price_by_night)}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${ud(place.max_guest)} Guest</div>
      <div class="number_rooms">${ud(place.number_rooms)} Bedroom</div>
      <div class="number_bathrooms">${ud(place.number_bathrooms)} Bathroom</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> ${ ud(place.user.first_name) } ${ ud(place.user.last_name) }
          </div>
          <div class="description">
	    ${ ud(place.description) }
          </div>
	</article>
      `;
      $('section.places').append(template);
    }
  });
})