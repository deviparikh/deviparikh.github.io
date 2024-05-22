---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/genuary2021.png
permalink: /genuary2021
---


# Genuary 2021 in a day

<a href='https://genuary2021.github.io/'>Genuary 2021</a> was organized by <a href='https://www.instagram.com/piterpasma/'>Piter Pasma</a> and others in the generative art community. There was <a href='https://genuary2021.github.io/prompts'>one prompt every day</a> for the month of January 2021.

I knew I wouldn't be able to do each prompt justice in a day. I knew I wouldn't be able to participate consistently for a month. But I wanted to participate in some way. 

I interpreted the prompts in the context of a single <span class="md-blue">core style</span>: The canvas is divided into rows of randomly varying heights. Each row is divided into columns of randomly varying widths. Each cell is colored using a random pixel from an input image.

I went through all the prompts in a day (<24 hours of work). I was optimizing for speed, sacrificing in some cases the essence of the prompt and aesthetics of the piece. 

Below are collages of pieces using different input images.


<a href = './static/art/genuary2021/all_maus__haus.png'><img src = './static/art/genuary2021/all_maus__haus.png' width="300px" alt = 'genuary'></a> 
<a href = './static/art/genuary2021/all_water.png'><img src = './static/art/genuary2021/all_water.png' width="300px" alt = 'genuary'></a>
<a href = './static/art/genuary2021/all_painting.png'><img src = './static/art/genuary2021/all_painting.png' width="300px" alt = 'genuary'></a>

The individual pieces below use a sunset image as input.

<div class = 'art'>

  {% for person in site.data.art.genuary2021 %}
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