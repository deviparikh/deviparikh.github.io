---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/genuary2022.png
permalink: /genuary2022
---


# Genuary 2022

<a href='http://genuary.art/'>Genuary 2022</a> was organized by <a href='https://twitter.com/piterpasma'>Piter Pasma</a> and others in the generative art community. There was <a href='http://genuary.art/prompts'>one prompt every day</a> for the month of January 2022.

<div class = 'art'>

  {% for person in site.data.art.genuary2022 %}
  <div class = 'singleartpiece'>
  	<br>
  	<span class="md-blue">{{ person.date }}</span>
	{{ person.prompt }}
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'genuary'></a>
    {{ person.exp }}
    <br>
    <br>
    <hr>
  </div>
  {% endfor %}
</div>