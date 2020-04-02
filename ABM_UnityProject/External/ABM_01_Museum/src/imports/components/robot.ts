import { FollowPathMoveComponent } from "./pathFollow"

const camera = Camera.instance

@Component('Robot')
export class Robot{
  entity: IEntity
  entityWalking: IEntity
  entityTalking: IEntity
  dialogIndex: number
  constructor(entity: IEntity, dialogIndex: number){
    this.entity = entity
    this.dialogIndex = dialogIndex

    this.entityWalking = new Entity()
    this.entityWalking.addComponent(new GLTFShape("assets/robot/robot_walking.gltf"))
    this.entityWalking.addComponent(new Transform({rotation: new Quaternion(0,-1,0,1)}))
    this.entityWalking.getComponent(GLTFShape).withCollisions = true
    this.entityWalking.getComponent(GLTFShape).visible = true
    this.entityWalking.setParent(entity)

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
  }
  setTalkMode(){
    this.entity.getComponent(FollowPathMoveComponent).moveComponent.deactivate()

    this.entityWalking.getComponent(GLTFShape).withCollisions = false
    this.entityWalking.getComponent(GLTFShape).visible = false

    this.entityTalking.getComponent(GLTFShape).withCollisions = true
    this.entityTalking.getComponent(GLTFShape).visible = true
    this.lookAtPlayer()
  }
  setMoveMode(){
    this.entity.getComponent(FollowPathMoveComponent).moveComponent.activate()

    this.entityTalking.getComponent(GLTFShape).withCollisions = false
    this.entityTalking.getComponent(GLTFShape).visible = false

    this.entityWalking.getComponent(GLTFShape).withCollisions = true
    this.entityWalking.getComponent(GLTFShape).visible = true
  }
  lookAtPlayer(startVector: Vector3 = null, targetVector: Vector3 = null, alpha: number = 0){
    if (startVector==null) {
      startVector = this.entity.getComponent(Transform).position.clone()
      targetVector = directionVectorBetweenTwoPoints(this.entity.getComponent(Transform).position.clone(), camera.position.clone())
    }
    var vector = Vector3.Lerp(startVector, targetVector, alpha)
    this.entity.getComponent(Transform).lookAt(vector, Vector3.Up())
    if (alpha<1) {
      this.lookAtPlayer(startVector, targetVector, alpha+0.1)
    }
    else{
      this.finishLookAtCallback()
    }
  }
  finishLookAtCallback(){

  }
}
