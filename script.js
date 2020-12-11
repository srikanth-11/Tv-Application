var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TV = /** @class */ (function () {
    function TV() {
        this.channelNo = 0;
        this.volume = 0.5;
        this.minvolume = 0.1;
        this.maxvolume = 1;
        this.lastchannel = 0;
        this.mute = false;
        this.channelList = [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        ];
        this.firstchannel = this.channelList.length - 1;
        var tvContainer = document.createElement("div");
        tvContainer.classList.add("tv-container");
        var monitor = document.createElement("div");
        monitor.classList.add("monitor");
        var monitorScreen = document.createElement("div");
        monitorScreen.classList.add("monitor-screen");
        var videoContainer = document.createElement("video");
        videoContainer.classList.add("video-container");
        videoContainer.id = "video-container";
        videoContainer.setAttribute("controls", "true");
        var initialChannel = Math.floor(Math.random() * this.firstchannel);
        var videoSource = document.createElement("source");
        videoSource.id = "video-source";
        videoSource.setAttribute("src", this.channelList[initialChannel]);
        videoSource.setAttribute("type", "video/mp4");
        videoContainer.append(videoSource);
        monitorScreen.append(videoContainer);
        monitor.append(monitorScreen);
        tvContainer.append(monitor);
        document.body.append(tvContainer);
    }
    TV.prototype.changeChannel = function (channelNumber) {
        if (channelNumber < this.lastchannel) {
            alert("This Is The Last Channel");
        }
        else if (channelNumber > this.firstchannel) {
            alert("This Is The First Channel");
        }
        else {
            this.channelNo = channelNumber;
            document
                .getElementById("video-source")
                .setAttribute("src", this.channelList[channelNumber]);
            var myvideoplayer = (document.getElementById("video-container"));
            myvideoplayer.load();
            myvideoplayer.play();
        }
    };
    TV.prototype.playandpause = function () {
        var videoPlayer = (document.getElementById("video-container"));
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
    };
    TV.prototype.maximumVolume = function () {
        if (this.volume + 0.1 > this.maxvolume) {
            alert("Max Volume Reached");
        }
        else {
            this.volume = this.volume + 0.1;
            var videoPlayer = (document.getElementById("video-container"));
            videoPlayer.volume = this.volume;
        }
    };
    TV.prototype.minimumVolume = function () {
        if (this.volume - 0.1 < this.minvolume) {
            alert("Min Volume Reached");
        }
        else {
            this.volume = this.volume - 0.1;
            var videoPlayer = (document.getElementById("video-container"));
            videoPlayer.volume = this.volume;
        }
    };
    TV.prototype.muteandunmute = function () {
        this.mute = !this.mute;
        var videoPlayer = (document.getElementById("video-container"));
        videoPlayer.muted = this.mute;
    };
    return TV;
}());
var control = /** @class */ (function (_super) {
    __extends(control, _super);
    function control() {
        var _this = _super.call(this) || this;
        _this.remoteUrl = "remote.png";
        var remoteContainer = document.createElement("div");
        remoteContainer.classList.add("remote-container");
        var remote = document.createElement("div");
        remote.classList.add("remote");
        var remoteImg = document.createElement("img");
        remoteImg.src = "" + _this.remoteUrl;
        remoteImg.id = "remote-img";
        remoteImg.setAttribute("usemap", "#remote-img");
        var remoteMap = document.createElement("map");
        remoteMap.setAttribute("name", "remote-img");
        var remotePowerCoordinates = "316,59,14";
        var remoteNumpadCoordinates = [
            "254,275,18",
            "205,136,18",
            "254,136,18",
            "303,136,18",
            "205,182,18",
            "254,182,18",
            "303,182,18",
            "205,229,18",
            "254,229,18",
            "303,229,18",
        ];
        var remoteVolumeCoordinates = ["225,334,22", "225,391,17"];
        var remoteChannelCoordinates = ["282,334,22", "282,391,17"];
        var remoteMuteUnmuteCoordinates = "193,370,8";
        var remoteAreaPower = document.createElement("area");
        remoteAreaPower.setAttribute("shape", "circle");
        remoteAreaPower.setAttribute("coords", remotePowerCoordinates);
        remoteAreaPower.setAttribute("href", "#");
        remoteAreaPower.onclick = function () {
            _this.playandpause();
        };
        remoteMap.append(remoteAreaPower);
        remoteNumpadCoordinates.forEach(function (coordinate, numpadKey) {
            var remoteAreaNumPad = document.createElement("area");
            remoteAreaNumPad.setAttribute("shape", "circle");
            remoteAreaNumPad.setAttribute("coords", coordinate);
            remoteAreaNumPad.setAttribute("href", "#");
            remoteAreaNumPad.onclick = function () {
                _this.changeChannel(numpadKey);
            };
            remoteMap.appendChild(remoteAreaNumPad);
        });
        remoteVolumeCoordinates.forEach(function (coordinate, index) {
            var remoteAreaVolume = document.createElement("area");
            remoteAreaVolume.setAttribute("shape", "circle");
            remoteAreaVolume.setAttribute("coords", coordinate);
            remoteAreaVolume.setAttribute("href", "#");
            remoteAreaVolume.onclick = function () {
                index === 0 ? _this.maximumVolume() : _this.minimumVolume();
            };
            remoteMap.appendChild(remoteAreaVolume);
        });
        remoteChannelCoordinates.forEach(function (coordinate, index) {
            var remoteAreaChannel = document.createElement("area");
            remoteAreaChannel.setAttribute("shape", "circle");
            remoteAreaChannel.setAttribute("coords", coordinate);
            remoteAreaChannel.setAttribute("href", "#");
            remoteAreaChannel.onclick = function () {
                index === 0
                    ? _this.changeChannel(_this.channelNo + 1)
                    : _this.changeChannel(_this.channelNo - 1);
            };
            remoteMap.appendChild(remoteAreaChannel);
        });
        var remoteMuteUnmute = document.createElement("area");
        remoteMuteUnmute.setAttribute("shape", "circle");
        remoteMuteUnmute.setAttribute("coords", remoteMuteUnmuteCoordinates);
        remoteMuteUnmute.setAttribute("href", "#");
        remoteMuteUnmute.onclick = function () {
            _this.muteandunmute();
        };
        remoteMap.append(remoteMuteUnmute);
        remote.append(remoteImg, remoteMap);
        remoteContainer.append(remote);
        document.body.append(remoteContainer);
        return _this;
    }
    return control;
}(TV));
var remote1 = new control();
