# Welcome to the Aetheria Block Museum!

We have created a Virtual Reality museum to tell the history of Ethereum through art. This Museum will have an official virtual reality location in the [Aetheria district](https://aetheria.io/) of [Decentraland](https://decentraland.org); this github repository will be hosting the latest museum content. We will update the VR scene when major changes are made to this repository, no automated deployment yet. If any factual mistakes or typos are detected, PR to this repo is welcome!

## What is the Aetheria Block Museum about?
We have identified 25 historically important blocks which have marked the history of Ethereum and organized them chronologically. The exhibited blocks are organized into 5 groups: "The First Million", "Early Days - theDAO", "Denial of Service", "The Bull Times" and "The Peak of Inflated Expectations".

You'll be able to digest the story behind the multiple hard forks, several infamous transactions (theDAO creation, the Parity multisig library suicide), the various DevCons and other milestones as well as memorable blocks. For each block, a textual description is accompanied by artwork from a crypto art collection owned by the Museum. The collection is currently composed of two series, both data art seeded from block information: the [CryptoArte project by Sebastian Brocher](https://www.cryptoarte.io/) and a hybrid data art/drawing series from [@HEX0x6C](https://superrare.co/HEX0x6C) and Chiara Braidotti. 

## How is the Museum organized?
The Museum stands tall in the Aetheria district. Virtual Reality visitors will start at the bottom of the Museum learning about block #0 (genesis) and make their way to the top of the Museum; where the exhibits for the latest blocks can be found. See a 3D rendering of the Museum [here](http://www.polygonalmind.com/blog/how-we-are-building-a-museum-in-decentraland). 

## What's Decentraland?
Virtual Reality meets Digital Ownership. You control the LAND,; you can transfer it to anyone, sell it, lease it and you can even... burn it! It's WebVR so you can easily share the scenes, and since it is a low-polygon environment it works on a wide-range of devices. 3D models and scenes are hosted on a decentralized file system while Ethereum serves as the ownership ledger and global game state. It's one of the first fully-decentralized games in the sense that the basic experience (3D content and game logic) is not controlled by any single party. Everyone who owns LAND gets to decide what the world will be like. It's an enormous playground for innovative web and gaming experiences, especially at the intersection of digital ownerships (collectibles, art, game items) and virtual reality. 

## What's Aetheria?
> "Do you dream of a cyberpunk dystopian future where we live majority of our lives in a virtual world?"
> Aetheria exists as a themed district and community organization within Decentraland with the goal of realizing cyberpunk ethos and aesthetic. Aetheria is largely community developed and driven.

[Source: aetheria.io](https://aetheria.io)

## How this repository is organized
The file museumDefinition.csv contains metadata related to each block. ENSMappings.csv contains addresses relevant to the exhibits and pointers to our corresponding subdomains. The textual descriptions for each block is organized by block ID in the exhibits folder. The folder dcl_scene contains the actual Decentraland scene which will be republished (manually, for now) as needed.

## Guidelines for the Museum
* The museum doesn't have to be exhaustive. It should highlight the obviously historical blocks, but a balanced, interesting and educative experience should be the focus.
* The textual description should be accessible to an Ethereum new-comer, but it should also provide interesting new information for Ethereum veterans.
* The artwork should be referenced in the textual description whenever relevant. 
* Grammatically correct within reason; factually accurate is more important.
* For polarizing historical events, offer arguments and views from both sides, but also clearly mention what the community consensus was. Be open and transparent.
* Use ENS whenever possible so it's easier for people to lookup interesting addresses once the VR experience is over.
* Most people will skim through the exhibits. Include the most interesting or important information at the top of the description.
* The Museum should evolve over time so that it adapts to the Aetheria theme. 

## Who are you and why did you build this museum?
We are The Momus Collective, a group of Decentraland developers who enjoy experimenting at the intersection of digital ownership, virtual reality, crypto art and blockchain technology. We own a significant amount of Private LAND and have used this project to gain experience with building Decentraland scenes. Furthermore, we'll use this museum scene to advertise for projects and teams we think deserve more recognition.

## License
GNU GPLv3

