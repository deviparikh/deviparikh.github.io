---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art, AI Art, Generative Art
favicon: static/img/art/artornot.png
permalink: /artornot
---

# Art, Or Not?

Art, Or Not? is a collection of nine pieces for [BrainDrops][braindrops].

I asked a chatbot "What are 10 text-to-image generation prompts that generate images that are art?" 

It said

> Here are ten text-to-image generation prompts that could potentially generate images that could be considered art:
> 
> 1. "Generate an image that conveys a sense of loneliness or isolation."
> 
> 2. "Generate a portrait of a dreamlike figure with otherworldly features."
> 
> 3. "Generate an abstract image that evokes a feeling of tension or conflict."
> 
> 4. "Generate an image that represents the concept of hope."
> 
> 5. "Generate an image that captures the beauty of nature."
> 
> 6. "Generate an image that tells a story or conveys a message."
> 
> 7. "Generate an image that incorporates elements of surrealism."
> 
> 8. "Generate an image that is inspired by the art of ancient civilizations."
> 
> 9. "Generate an image that depicts a dream or a nightmare."
> 
> 10. "Generate an image that captures the essence of a particular emotion or feeling."
> 
> These prompts may generate images that are more focused on aesthetic or expressive qualities, and could potentially be considered art due to their focus on creating an emotional response or conveying a message. However, whether an image is considered art is ultimately a subjective judgment that can vary from person to person.


I then asked it "What are 10 text-to-image generation prompts that generate images that are not art?"

It said


> Here are ten text-to-image generation prompts that could potentially generate images that are not considered art:
> 
> 1. "Generate an image of a car maintenance manual page."
> 
> 2. "Generate an image of a chart showing the sales figures for a company."
> 
> 3. "Generate an image of a map of a city, with the locations of different businesses labeled."
> 
> 4. "Generate an image of a flowchart showing the steps involved in a manufacturing process."
> 
> 5. "Generate an image of a diagram illustrating how a particular mechanical device 
works."
> 
> 6. "Generate an image of a graph showing the performance of a stock over time."
> 
> 7. "Generate an image of a table of data showing the results of a scientific experiment."
> 
> 8. "Generate an image of a schematic showing the wiring diagram of a home entertainment system."
> 
> 9. "Generate an image of a floor plan of a house or building."
> 
> 10. "Generate an image of a recipe with step-by-step instructions for cooking a meal."
> 
> It is possible that the images generated by these prompts could be functional or informative, but they may not be considered art due to their focus on conveying information or performing a specific task, rather than on aesthetic or expressive qualities.

I used a text-to-image generation model to generate images for each of these prompts.

I then processed and re-rendered the images in a hand-designed palette. The original image stays faintly visible in them.

I then showed 42 people pairs of images -- one that was supposed to be art, and the other that wasn't -- and asked them which one looks more like a piece of art.

I kept 9 pieces pieces that looked most like art to people. 

Interestingly, of the top six, three were from prompts that were supposed to generate art, and three that were not. The last three were supposed to generate art.

I then restyled the images. Below are the final pieces.

So -- Art, Or Not?

<div class = 'art'>
  {% for person in site.data.art.artornot %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'artornot'></a>
    {{ person.exp }}
    <br>
    <br>
    <hr>
  </div>
  {% endfor %}
</div>

Thank you Abhishek Das for feedback on the style!

[braindrops]: https://braindrops.cloud/