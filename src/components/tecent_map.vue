<template>
    <div>
        <div id="container" style="width:800px;height:500px;top: 20px;"></div>
    </div>
</template>

<script>
    export default{
        props: {
            longitude: {
                type: Number,
                default: 116.397128
            },
            latitude: {
                type: Number,
                default: 39.916527
            },
            zoom: {
                type: Number,
                default: 11
            },
        },
        data() {
            return {
            }
        },
        mounted() {
            console.log(this.longitude)
            console.log(this.latitude)
            this.mapInit(this.longitude,this.latitude, this.zoom);
        },
        methods:{
            setLoc(lng, lat) {
                this.mapInit(lng, lat, 16);
            },
            //搜索某一地点名
            getLoc(ele) {
                this.$axios({
                    url: url, 
                    //直接使用腾讯的搜索api的话会报跨域错误
                    //我是通过node服务端作为代理去请求数据
                    //所以这里就不放出实际ip地址了哈
                    //在最后我会将node部分的代码也加上
                    method: "get",
                    params: {
                    address: ele
                    }
                })
                .then(res => {
                    let searchObj = res.data.data;
                    searchObj.search = 1;
                    this.$emit("mapSend", searchObj);
                    let _this = this;
                    let resultData = res.data.data.data[0];
                    if (res.data.data.status == 0) {
                        this.mapInit(resultData.location.lng, resultData.location.lat, 16);
                    }
                    })
                .catch(error => {
                    console.log(error);
                    });
            },
            //根据传入的值渲染地图及传出经纬度和地名
            mapInit(lng,lat,zoom) {
                let _this = this
                var map = new qq.maps.Map(document.getElementById("container"), {
                    // 地图的中心地理坐标。
                    center: new qq.maps.LatLng(
                        lat,
                        lng,
                    ),
                    zoom: zoom
                });
                var marker = new qq.maps.Marker({
                    position: new qq.maps.LatLng(
                        lat,
                        lng
                    ),
                    map: map
                });
                qq.maps.event.addListener(map, "click", function(event) {
                    marker.setMap(null);
                });
                qq.maps.event.addListener(map, "click", function(event) {
                    let result = {
                    status: 0,
                    result: {
                        location: {
                        lng: event.latLng.getLng(),
                        lat: event.latLng.getLat()
                        }
                    }
                    };
                    qq.maps.event.addListener(map, "click", function(event) {
                    marker.setMap(null);
                    });
                    var marker = new qq.maps.Marker({
                    position: event.latLng,
                    map: map
                    });

                    _this
                    .$axios({
                        url: url,
                        //这里的url跟上面也是相同的问题
                        method: "get",
                        params: {
                        location: event.latLng.getLat() + "," + event.latLng.getLng()
                        }
                    })
                    .then(res => {
                        res.data.data.extra = 1;
                        _this.$emit("mapSend", res.data.data);
                    })
                    .catch(err => {
                        this.$message({
                        type: 'warning',
                        message: '定位解析失败'
                        })
                    })
                });
            },
        }
    }
</script>