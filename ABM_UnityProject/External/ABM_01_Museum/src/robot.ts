import { FollowPathMoveComponent } from "./imports/components/pathFollow"
import { getHUD } from "./hud"

const camera = Camera.instance

@Component('Robot')
export class Robot{
  entity: IEntity
  entityWalking: IEntity
  entityTalking: IEntity
  bInWalkMode: boolean
  dialogIndex: number
  lastPointIndex: number
  constructor(entity: IEntity, dialogIndex: number){
    this.entity = entity
    this.dialogIndex = dialogIndex

    this.entityWalking = new Entity()
    this.entityWalking.addComponent(new GLTFShape("assets/robot/robot_walking.gltf"))
    this.entityWalking.addComponent(new Transform({rotation: new Quaternion(0,-1,0,1)}))
    this.entityWalking.getComponent(GLTFShape).withCollisions = true
    this.entityWalking.getComponent(GLTFShape).visible = true
    this.entityWalking.setParent(entity)
    this.bInWalkMode = true

    this.entityTalking = new Entity()
    this.entityTalking.addComponent(new GLTFShape("assets/robot/robot_talking.gltf"))
    this.entityTalking.addComponent(new Transform({rotation: new Quaternion(0,-1,0,1)}))
    this.entityTalking.getComponent(GLTFShape).withCollisions = false
    this.entityTalking.getComponent(GLTFShape).visible = false
    this.entityTalking.setParent(entity)

    var self = this
    this.entityWalking.addComponent(new OnPointerDown(
        function() {
            self.setTalkMode()
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Talk to the robot",
          distance: 5
        }
    ))
    /*this.entityTalking.addComponent(new OnPointerDown(
        function() {
          self.setMoveMode()
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Talk to the robot",
          distance: 5
        }
    ))*/
  }
  setTalkMode(){
    this.entity.getComponent(FollowPathMoveComponent).moveComponent.deactivate()
    this.lastPointIndex = this.entity.getComponent(FollowPathMoveComponent).targetPointIndex-1
    this.entity.getComponent(FollowPathMoveComponent).reset()

    this.entityWalking.getComponent(GLTFShape).withCollisions = false
    this.entityWalking.getComponent(GLTFShape).visible = false

    this.entityTalking.getComponent(GLTFShape).withCollisions = true
    this.entityTalking.getComponent(GLTFShape).visible = true
    this.bInWalkMode = false
    this.lookAtPlayer()
  }
  setMoveMode(){
    getHUD().hideAll()
    this.entity.getComponent(FollowPathMoveComponent).targetPointIndex = this.lastPointIndex
    this.entity.getComponent(FollowPathMoveComponent).moveToNextPoint()

    this.entityTalking.getComponent(GLTFShape).withCollisions = false
    this.entityTalking.getComponent(GLTFShape).visible = false

    this.entityWalking.getComponent(GLTFShape).withCollisions = true
    this.entityWalking.getComponent(GLTFShape).visible = true
    this.bInWalkMode = true
  }
  lookAtPlayer(startVector: Vector3 = null, targetVector: Vector3 = null, alpha: number = 0){
    if (startVector==null) {
      startVector = this.entity.getComponent(Transform).position.clone()
      targetVector = directionVectorBetweenTwoPoints(this.entity.getComponent(Transform).position.clone(), camera.position.clone())
    }
    var vector = Vector3.Lerp(startVector.clone(), targetVector.clone(), alpha)
    this.entity.getComponent(Transform).lookAt(vector.clone())
    if (alpha<1) {
      var self = this
      setTimeout(() => {
        self.lookAtPlayer(startVector, targetVector, alpha+0.1)
      }, 50);

    }
    else{
      this.finishLookAtCallback()
    }
  }
  finishLookAtCallback(){
    var self = this
    getHUD().setRobotDialogIndex(this.dialogIndex)
    getHUD().wgTalkRobot.callback = function(){
      self.setMoveMode()
    }
    getHUD().showWidgetIndex(0, true)
  }
}
