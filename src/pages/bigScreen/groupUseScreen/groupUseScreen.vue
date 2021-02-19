<template>
  <group-screen :title="title">
    <div slot="second" class="test">
      <p>测试插槽功能</p>
    </div>
    <div slot="background" id="three"></div>
  </group-screen>
</template>

<script>
import groupScreen from "@/components/common/fullScreen/groupScreen.vue";

import { CircularLinkedList } from "@/assets/js/dataStructure.js";

export default {
  name: "groupUseScreen",
  components: {
    groupScreen
  },
  data() {
    return {
      earth: null,
      fontObject: null,
      title: "集团用数据大屏",
      scene: null, // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      labelRenderer: null, // 文字渲染器,
      controls: null,
      angle: 0, // 中心大球旋转角度
      ballAngle: 0, // 小球旋转角度
      currentAngle: 0,
      isAnimate: true,
      companiesList: [
        {
          companyName: "子公司1",
          children: [
            {
              companyName: "子公司1-1"
            },
            {
              companyName: "子公司1-2"
            },
            {
              companyName: "子公司1-3"
            },
            {
              companyName: "子公司1-4"
            }
          ]
        },
        {
          companyName: "子公司2",
          children: [
            {
              companyName: "子公司2-1"
            },
            {
              companyName: "子公司2-2"
            },
            {
              companyName: "子公司2-3"
            },
            {
              companyName: "子公司2-4"
            }
          ]
        },
        {
          companyName: "子公司3",
          children: [
            {
              companyName: "子公司3-1"
            },
            {
              companyName: "子公司3-2"
            },
            {
              companyName: "子公司3-3"
            },
            {
              companyName: "子公司3-4"
            }
          ]
        },
        {
          companyName: "子公司4",
          children: [
            {
              companyName: "子公司4-1"
            },
            {
              companyName: "子公司4-2"
            },
            {
              companyName: "子公司4-3"
            },
            {
              companyName: "子公司4-4"
            }
          ]
        },
        {
          companyName: "子公司5",
          children: [
            {
              companyName: "子公司5-1"
            },
            {
              companyName: "子公司5-2"
            },
            {
              companyName: "子公司5-3"
            },
            {
              companyName: "子公司5-4"
            }
          ]
        },
        {
          companyName: "子公司6",
          children: [
            {
              companyName: "子公司6-1"
            },
            {
              companyName: "子公司6-2"
            },
            {
              companyName: "子公司6-3"
            },
            {
              companyName: "子公司6-4"
            }
          ]
        }
      ],
      companies: null, // 公司信息链表
      currentNode: null, // 公司信息链表当前节点,
      requestAnimationFrameID: null
    };
  },
  methods: {
    // 创建背景
    animate() {
      if (this.$WEBGL.isWebGLAvailable) {
        // 场景
        this.scene = new this.$THREE.Scene();
        // 相机
        this.camera = new this.$THREE.PerspectiveCamera(
          35,
          window.innerWidth / window.innerHeight,
          0.75,
          800
        );
        this.camera.position.set(0, -500, 500);
        // this.camera.lookAt(500, 0, 0);
        /**
         * camera.lookAt()与OrbitControls冲突
         * 使用OrbitControl将camera的lookAt向量修改为new THREE.Vector3(),所以设置lookAt向量失效
         * 使用OrbitControls时修改视角焦点需要设置OrbitControls.target
         * controls.target = new THREE.Vector3(0,1,0);
         */

        // 渲染器
        this.renderer = new this.$THREE.WebGLRenderer();
        this.renderer.physicallyCorrectLights = true;

        // this.renderer.setClearColor(0x222222, 1.0);

        document.querySelector("#three").appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        let helpers = new this.$THREE.Group(); //实例化辅助对象组
        helpers.add(new this.$THREE.AxesHelper(200)); //添加坐标系控件长度为200
        // this.scene.add(helpers); //添加到场景

        // 生成公司链表
        this.companies = this.createCompanyList();
        this.currentNode = this.companies.head;

        /**
         * 创建实例
         * */

        // 载入自定义模型
        let fbxLoader = new this.$FBXLoader();
        let self = this;

        // 模型贴图
        let earthTexturePlante = this.$THREE.ImageUtils.loadTexture(
          "/static/models/earth/Textures/Night_lights_2K.png",
          null,
          function(t) {}
        );

        fbxLoader.load("/static/models/earth/Earth_2K.fbx", function(object) {
          object.name = "center";
          object.link = "/carPassengerBusiness";
          object.isAnchor = true;
          object.rotation.y = 0;
          object.traverse(function(child) {
            if (child.isMesh) {
              let material = new self.$THREE.MeshPhongMaterial({
                map: earthTexturePlante
              });
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          object.scale.set(0.2, 0.2, 0.2);
          object.position.set(0, 50, 0);
          // 创建label文字信息
          let earthDiv = document.createElement("div");
          earthDiv.textContent = "交旅集团";
          earthDiv.style.color = "#ffffff";
          earthDiv.style.fontSize = "2rem";
          let earthLabel = new self.$CSS2DObject(earthDiv);
          earthLabel.position.set(0, 0, 0);
          object.add(earthLabel);
          self.scene.add(object);
          temp = object;
        });

        // 创建第二个球体对象
        let earthTexturePlante2 = this.$THREE.ImageUtils.loadTexture(
          "/static/models/earth/Textures/Diffuse_2K.png",
          null,
          function(t) {}
        );

        fbxLoader.load("/static/models/earth/Earth_2K.fbx", function(object) {
          object.name = "firstBall";
          object.link = "/ticketRevenueForm";
          object.isAnchor = true;
          object.isFront = true;
          object.traverse(function(child) {
            if (child.isMesh) {
              let material = new self.$THREE.MeshPhongMaterial({
                map: earthTexturePlante2
              });
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          object.scale.set(0.05, 0.05, 0.05);
          // 创建label文字信息
          let earthDiv = document.createElement("div");
          earthDiv.textContent = self.currentNode.element.companyName;
          earthDiv.style.color = "#ffffff";
          earthDiv.style.fontSize = "1.5rem";
          let earthLabel = new self.$CSS2DObject(earthDiv);
          earthLabel.position.set(0, 0, 0);
          object.add(earthLabel);
          self.scene.add(object);
        });

        // 创建第三个球体对象
        let earthTexturePlante3 = this.$THREE.ImageUtils.loadTexture(
          "/static/models/earth/Textures/Ocean_Mask_2K.png",
          null,
          function(t) {}
        );

        fbxLoader.load("/static/models/earth/Earth_2K.fbx", function(object) {
          object.name = "secondBall";
          object.link = "/ticketRevenueForm";
          object.isAnchor = true;
          object.isFront = true;
          object.traverse(function(child) {
            if (child.isMesh) {
              let material = new self.$THREE.MeshPhongMaterial({
                map: earthTexturePlante3
              });
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          object.scale.set(0.05, 0.05, 0.05);
          // 创建label文字信息
          let earthDiv = document.createElement("div");
          self.currentNode = self.currentNode.next;
          earthDiv.textContent = self.currentNode.element.companyName;
          earthDiv.style.color = "#ffffff";
          earthDiv.style.fontSize = "1.5rem";
          let earthLabel = new self.$CSS2DObject(earthDiv);
          earthLabel.position.set(0, 0, 0);
          object.add(earthLabel);
          self.scene.add(object);
        });

        // 创建第四个球体对象
        let earthTexturePlante4 = this.$THREE.ImageUtils.loadTexture(
          "/static/models/earth/Textures/Clouds_2K.png",
          null,
          function(t) {}
        );

        fbxLoader.load("/static/models/earth/Earth_2K.fbx", function(object) {
          object.name = "thirdBall";
          object.link = "/ticketRevenueForm";
          object.isAnchor = true;
          object.isFront = true;
          object.traverse(function(child) {
            if (child.isMesh) {
              let material = new self.$THREE.MeshPhongMaterial({
                map: earthTexturePlante4
              });
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          object.scale.set(0.05, 0.05, 0.05);
          // 创建label文字信息
          let earthDiv = document.createElement("div");
          self.currentNode = self.currentNode.next;
          earthDiv.textContent = self.currentNode.element.companyName;
          earthDiv.style.color = "#ffffff";
          earthDiv.style.fontSize = "1.5rem";
          let earthLabel = new self.$CSS2DObject(earthDiv);
          earthLabel.position.set(0, 0, 0);
          object.add(earthLabel);
          self.scene.add(object);
        });

        // 创建文字渲染器
        this.labelRenderer = new this.$CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = "fixed";
        this.labelRenderer.domElement.style.top = 0;
        this.labelRenderer.domElement.style.pointerEvents = "none";
        document
          .querySelector("#three")
          .appendChild(this.labelRenderer.domElement);

        this.labelRenderer.render(this.scene, this.camera);

        // 设置点光源
        // let pointLight = new this.$THREE.PointLight(0xffffff, 50, 0, 0.1);
        // pointLight.position.set(200, 0, -200);
        // this.scene.add(pointLight);

        // 设置环境光
        let ambientLight = new this.$THREE.AmbientLight(0xffffff, 2); // soft white light
        this.scene.add(ambientLight);

        // this.scene.fog = new this.$THREE.Fog({ color: 0xffffff }, 0.02);

        // 创建控件对象
        this.controls = new this.$OrbitControls(
          this.camera,
          this.renderer.domElement
        );
        // 设置垂直轨道相机移动上限和下限,范围为[0,Math*PI]
        this.controls.minPolarAngle = Math.PI * 0.35;
        this.controls.maxPolarAngle = Math.PI * 0.35;
        // 设置水平轨道相机移动上限和下限,范围为[- Math.PI,Math.PI]
        // this.controls.minAzimuthAngle = -Math.PI; // radians
        // this.controls.maxAzimuthAngle = Math.PI; //弧度
        this.controls.minAzimuthAngle = -Infinity;
        this.controls.maxAzimuthAngle = Infinity;
        // 限制场景缩放
        this.controls.enableZoom = false;
        // 限制场景旋转
        this.controls.enableRotate = true;
        // 限制场景平移
        this.controls.enablePan = false;
        // 修改视角焦点
        this.controls.target = new this.$THREE.Vector3(0, 0, 0);
        // 启用阻尼(惯性)
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        let rotation = new this.$THREE.Euler();
        // 监听鼠标事件，触发渲染函数，更新canvas画布
        this.controls.update();
        this.render();
      } else {
        let warning = this.$WEBGL.getWEBGLErrorMessage();
      }
    },
    // 添加模型点击事件
    onMouseClick(event) {
      console.log("mouse down");
      this.isAnimate = false;
      let self = this;
      let raycaster = new this.$THREE.Raycaster();
      let mouse = new this.$THREE.Vector2();
      //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, this.camera);
      // 获取raycaster直线和所有模型相交的数组集合

      /**
       * 射线检测相交的最好方式是检测一个组对象
       * 1.创建组对象
       * let group = new this.$THREE.Group();
       * 2.将需要检测的对象添加进组中
       * group.add(model1);
       * group.add(model2);
       * ....
       * 3.将group添加到场景中 ?
       * this.scene.add(group);
       * 4.进行射线检测
       * let intersects = raycaster.intersectObjects(group);
       * 射线检测第二个参数默认为false
       * 如果传第二个值为true，将遍历数组内的所有模型的子类，也就是深度遍历。如果当前没有模型相交，将返回一个空数组，如果有模型，数组内的模型将按照相交距离从近到远排序
       */

      let intersects = raycaster.intersectObjects(this.scene.children, true);
      // 遍历获取到的模型
      if (intersects.length != 0) {
        // this.pageJump(intersects[0].object);
        // 递归获取点击对象
        let mod = intersects[0].object;
        while (!(mod instanceof this.$THREE.Group)) {
          mod = mod.parent;
        }
        // 对获取到的对象进行操作
        // TODO
        console.log(mod);
        // 修改视角焦点
        // const 
        this.controls.target = new this.$THREE.Vector3(0, 0, 0);
      }
    },
    // 添加模型鼠标滑入事件
    onMouseOver(event) {},
    // 添加模型鼠标滑出事件
    onMouseOut(event) {},
    // 页面跳转
    pageJump(obj) {
      if (obj.parent.type == "Scene") {
        // this.$router.push({ path: "/carPassengerBusiness" });
        // this.$router.push({ path: obj.link });
        // console.log(obj.parent);
      } else {
        // this.pageJump(obj.parent);
      }
    },
    // 鼠标弹起
    onMouseUp() {
      console.log("mouse up");
      this.isAnimate = true;
    },
    // 动画渲染
    render() {
      this.requestAnimationFrameID = requestAnimationFrame(this.render);
      this.controls.update();
      if (this.isAnimate) {
        this.startAnimate();
      } else {
        this.stopAnimate();
      }
      let azimuthalAngle = this.controls.getAzimuthalAngle();
      // console.log(azimuthalAngle);
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
    },
    // 开始动画
    startAnimate() {
      this.angle += 0.005;
      this.ballAngle += 0.005;
      this.currentAngle = this.ballAngle;
      this.scene.children.forEach(item => {
        // 中心大球动画
        if (item.name == "center") {
          item.rotation.y = this.angle;
        }
        // 第一个小球动画
        if (item.name == "firstBall") {
          item.position.set(
            Math.sin(this.ballAngle + Math.PI / 2) * 150,
            50,
            Math.cos(this.ballAngle + Math.PI / 2) * 150
          );
          if (item.position.z < -135) {
            if (item.isFront) {
              this.currentNode = this.currentNode.next;
              item.children[1].element.textContent = this.currentNode.element.companyName;
              item.isFront = false;
            }
          } else {
            item.isFront = true;
          }
        }
        // 第二个小球动画
        if (item.name == "secondBall") {
          item.position.set(
            Math.sin(this.ballAngle) * 150,
            50,
            Math.cos(this.ballAngle) * 150
          );
          if (item.position.z < -135) {
            if (item.isFront) {
              this.currentNode = this.currentNode.next;
              item.children[1].element.textContent = this.currentNode.element.companyName;
              item.isFront = false;
            }
          } else {
            item.isFront = true;
          }
        }
        // 第三个小球动画
        if (item.name == "thirdBall") {
          item.position.set(
            Math.sin(this.ballAngle - Math.PI / 2) * 150,
            50,
            Math.cos(this.ballAngle - Math.PI / 2) * 150
          );
          if (item.position.z < -135) {
            if (item.isFront) {
              this.currentNode = this.currentNode.next;
              item.children[1].element.textContent = this.currentNode.element.companyName;
              item.isFront = false;
            }
          } else {
            item.isFront = true;
          }
        }
      });
    },
    // 停止动画
    stopAnimate() {
      this.angle += 0.005;
      this.scene.children.forEach(item => {
        // 中心大球
        if (item.name == "center") {
          item.rotation.y = this.angle;
        }
        // 第一个小球
        if (item.name == "firstBall") {
          item.position.set(
            Math.sin(this.ballAngle + Math.PI / 2) * 150,
            50,
            Math.cos(this.ballAngle + Math.PI / 2) * 150
          );
        }
        // 第二个小球
        if (item.name == "secondBall") {
          item.position.set(
            Math.sin(this.ballAngle) * 150,
            50,
            Math.cos(this.ballAngle) * 150
          );
        }
        // 第三个小球
        if (item.name == "thirdBall") {
          item.position.set(
            Math.sin(this.ballAngle - Math.PI / 2) * 150,
            50,
            Math.cos(this.ballAngle - Math.PI / 2) * 150
          );
        }
      });
    },
    // 生成公司链表
    createCompanyList() {
      let list = new CircularLinkedList();
      this.companiesList.forEach(item => {
        list.push(item);
      });
      return list;
    }
  },
  created() {
    window.addEventListener("mousedown", this.onMouseClick, false);
    window.addEventListener("mouseup", this.onMouseUp, false);
    // window.addEventListener("mouseover", this.onMouseClick, false);
    // window.addEventListener("mouseout", this.onMouseOut, false);
  },
  mounted() {
    this.animate();
    // 场景大小自适应
    window.onresize = () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    };
  },
  beforeDestroy() {
    // 销毁requestAnimationFrame动画
    window.cancelAnimationFrame(this.requestAnimationFrameID);
    // 移除监听事件
    window.removeEventListener("mousedown", this.onMouseClick);
    window.removeEventListener("mouseup", this.onMouseUp);
    // window.removeEventListener("mouseover", () => {});
    // window.removeEventListener("mouseout", () => {});
  }
};
</script>

<style lang="scss" scoped>
.test {
  color: #fff;
  text-align: center;
}
#three {
  width: 100vw;
  height: 100vh;
  z-index: -9;
  pointer-events: all;
}
</style>