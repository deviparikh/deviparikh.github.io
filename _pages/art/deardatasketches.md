---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/deardatasketches.png
permalink: /deardatasketches
---


# Sketches inspired by designs in [Dear Data][deardata]


<div class = 'art'>

  {% for person in site.data.art.deardatasketches %}
  <div class = 'singleartpiece'>
  	<br>
  	<span class="md-blue"></span>
	  <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'dear data sketches'></a>
    <br>
    <br>
    <hr>
  </div>
  {% endfor %}
</div>

[deardata]: http://www.dear-data.com/