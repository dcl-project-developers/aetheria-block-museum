import utils from "../../../node_modules/decentraland-ecs-utils/index"
import { Widget } from '../widgets'

var widgetNFT: WidgetNFT

export function getWidgetNFT(){
    return widgetNFT
}

export function setWidgetNFT(canvas: UICanvas){
    widgetNFT = new WidgetNFT(canvas)
}

@Component('NFTdata')
export class NFTdata{
  entity: IEntity
  smartContract: string
  tokenId: string
  title: string
  description: string
  autor: string
  bDebug: boolean
  constructor(entity: IEntity, smartContract, tokenId, title?: string, autor?: string, description?: string){
    this.entity = entity
    this.smartContract = smartContract
    this.tokenId = tokenId
    if (smartContract!="") {
      const shapeComponent = new NFTShape('ethereum://'+smartContract+'/'+tokenId,Color3.Blue())
      entity.addComponent(shapeComponent)
    }
    this.title = title
    this.description = description
    this.autor = autor
    this.bDebug = true
    this.createTrigger()
  }
  createTrigger(){
    let triggerBox = new utils.TriggerBoxShape(new Vector3(10,5,10), new Vector3(0,0,0))
    //create trigger for entity
    let trigger = new utils.TriggerComponent(
       triggerBox, //shape
       0, //layer
       0, //triggeredByLayer
       null, //onTriggerEnter
       null, //onTriggerExit
       null,  //onCameraEnter
       null //onCameraExits
    )

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform({ position: this.entity.getComponent(Transform).position}))
    triggerEntity.addComponent(trigger)
    engine.addEntity(triggerEntity)
    let self = this
    this.entity.addComponent(new OnPointerDown(
        function() {
          var wg = getWidgetNFT()
          if (wg.currentNFT!=self) {
            wg.setNFTdata(self)
            wg.show(true)
          }
          else wg.show(!wg.container.visible)
        },
        {
          button: ActionButton.POINTER,
          hoverText: "More info",
          distance: 5
        }
    ))

    trigger.onCameraExit = function(){
      var wg = getWidgetNFT()
      if (wg.currentNFT==self) {
        wg.show(false)
      }
    }

    if (this.bDebug) {
      //Debug
      const debugEntity = new Entity()
      debugEntity.addComponent(new Transform({ position: this.entity.getComponent(Transform).position.add(triggerBox.position) , scale: triggerBox.size}))
      debugEntity.addComponent(new BoxShape())
      debugEntity.getComponent(BoxShape).withCollisions = false
      const myDebugMaterial = new Material()
      myDebugMaterial.albedoColor = new Color4(1, 0, 0, 0.2)
      debugEntity.addComponent(myDebugMaterial)
      engine.addEntity(debugEntity)
    }
    return trigger;
  }
}


export class WidgetNFT extends Widget{
  canvas: UICanvas
  container: UIContainerRect
  image: UIImage
  titleShape: UIText
  autorShape: UIText
  textShape: UIText
  currentNFT: NFTdata
  constructor(parentUI: Widget | UIShape){
    var parent: UIShape;
    if (parentUI as Widget) {
      parent = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      parent = (parentUI as UIShape)
    }

    var image = new UIImage(parent, new Texture("assets/UI_ArtDescription_01.png"))
    image.visible = false
    image.sourceWidth = 665
    image.sourceHeight = 1000
    image.width = image.sourceWidth*0.6+'px'
    image.height = image.sourceHeight*0.6+'px'
    image.vAlign = 'top'
    image.hAlign = 'right'

    var container = new UIContainerRect(parent)
    container.visible = false
    container.vAlign = 'top'
    container.hAlign = 'right'
    container.width = image.sourceWidth*0.55
    container.height = image.height
    container.positionX = -20
    //container.color = new Color4(1,1,1,0.5)
    container.adaptHeight = false
    container.adaptWidth = false

    super(parentUI, container)

    this.container = container
    this.image = image

    let titleContainer = new UIContainerRect(this.container)
    titleContainer.positionY = "-2.5%"
    titleContainer.positionX = "2.5%"
    titleContainer.vAlign = 'top'
    titleContainer.hAlign = 'left'
    titleContainer.width = "87%"
    titleContainer.height = "8%"
    //titleContainer.color = new Color4(0,0,0,0.5)
    titleContainer.adaptHeight = false
    titleContainer.adaptWidth = false

    this.titleShape = new UIText(titleContainer)
    this.titleShape.hTextAlign = 'left'
    this.titleShape.vTextAlign = 'center'
    this.titleShape.height = "98%"
    this.titleShape.width = "92%"
    this.titleShape.color = Color4.White()
    //this.updateTitle("Decentraland MANA sale startBlock")
    this.titleShape.textWrapping = true

    let autorContainer = new UIContainerRect(this.container)
    autorContainer.positionY = "-11%"
    autorContainer.positionX = "4.5%"
    autorContainer.vAlign = 'top'
    autorContainer.hAlign = 'center'
    autorContainer.width = "89%"
    autorContainer.height = "7%"
    //autorContainer.color = new Color4(1,0,0,0.5)
    autorContainer.adaptHeight = false
    autorContainer.adaptWidth = false

    this.autorShape = new UIText(autorContainer)
    this.autorShape.hTextAlign = 'left'
    this.autorShape.vTextAlign = 'center'
    this.autorShape.height = "50%"
    this.autorShape.width = "90%"
    this.autorShape.color = Color4.Black()
    //this.autorShape.value = "Autor name"
    this.autorShape.textWrapping = true
    this.autorShape.fontAutoSize = true


    let textContainer = new UIContainerRect(this.container)
    textContainer.positionY = "-7%"
    textContainer.positionX = "4.5%"
    textContainer.vAlign = 'center'
    textContainer.hAlign = 'center'
    textContainer.width = "89%"
    textContainer.height = "76%"
    //textContainer.color = new Color4(0,0,1,0.5)
    textContainer.adaptHeight = false
    textContainer.adaptWidth = false
/*
    let textScroll = new UIScrollRect(textContainer)
    textScroll.vAlign = 'center'
    textScroll.hAlign = 'center'
    textScroll.width = "100%"
    textScroll.height = "100%"
    textScroll.valueY = 10000
    textScroll.isVertical = true
*/
    this.textShape = new UIText(textContainer)
    this.textShape.hTextAlign = 'left'
    this.textShape.vTextAlign = 'top'
    this.textShape.height = "95%"
    this.textShape.width = "90%"
    this.textShape.color = Color4.Black()
    this.textShape.fontSize = 14
    this.textShape.textWrapping = true
  }
  //Muestra u oculta el widget y sus hijos, no muestra los hijos que no tengan bVisibleWithParent==true
  show(bVisible: boolean){
    this.container.visible = bVisible
    this.image.visible = bVisible
    for (let index = 0; index < this.childrenWidget.length; index++) {
      if (this.childrenWidget[index].bVisibleWithParent || !bVisible) {
        this.childrenWidget[index].show(bVisible);
      }
    }
  }
  private updateTitle(value: string){
    this.titleShape.value = value
    var alpha = clamp((this.titleShape.value.length-20)/20, 0, 1)
    this.titleShape.fontSize = lerp(25,12,alpha)
  }
  setNFTdata(newNFT: NFTdata){
    this.currentNFT = newNFT
    this.updateTitle(newNFT.title)
    this.autorShape.value = newNFT.autor
    this.textShape.value = newNFT.description
  }
}
