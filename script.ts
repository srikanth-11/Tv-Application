class TV {
  channelList: Array<string>;
  channelNo: number = 0;
  volume: number = 0.5;
  minvolume: number = 0.1;
  maxvolume: number = 1;
  lastchannel: number = 0;
  firstchannel: number;
  mute: boolean = false;

  constructor() {
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

    let tvContainer = document.createElement("div");
    tvContainer.classList.add("tv-container");

    let monitor = document.createElement("div");
    monitor.classList.add("monitor");

    let monitorScreen = document.createElement("div");
    monitorScreen.classList.add("monitor-screen");

    let videoContainer = document.createElement("video");
    videoContainer.classList.add("video-container");
    videoContainer.id = "video-container";
    videoContainer.setAttribute("controls", "true");

    let initialChannel: number = Math.floor(Math.random() * this.firstchannel);
    let videoSource = document.createElement("source");
    videoSource.id = "video-source";
    videoSource.setAttribute("src", this.channelList[initialChannel]);
    videoSource.setAttribute("type", "video/mp4");

    videoContainer.append(videoSource);
    monitorScreen.append(videoContainer);
    monitor.append(monitorScreen);
    tvContainer.append(monitor);
    document.body.append(tvContainer);
  }
  changeChannel(channelNumber: number): void {
    if (channelNumber < this.lastchannel) {
      alert("This Is The Last Channel");
    } else if (channelNumber > this.firstchannel) {
      alert("This Is The First Channel");
    } else {
      this.channelNo = channelNumber;
      document
        .getElementById("video-source")
        .setAttribute("src", this.channelList[channelNumber]);
      let myvideoplayer = <HTMLMediaElement>(
        document.getElementById("video-container")
      );
      myvideoplayer.load();
      myvideoplayer.play();
    }
  }
  playandpause(): void {
    let videoPlayer = <HTMLMediaElement>(
      document.getElementById("video-container")
    );
    videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
  }
  maximumVolume(): void {
    if (this.volume + 0.1 > this.maxvolume) {
      alert("Max Volume Reached");
    } else {
      this.volume = this.volume + 0.1;
      let videoPlayer = <HTMLMediaElement>(
        document.getElementById("video-container")
      );
      videoPlayer.volume = this.volume;
    }
  }

  minimumVolume(): void {
    if (this.volume - 0.1 < this.minvolume) {
      alert("Min Volume Reached");
    } else {
      this.volume = this.volume - 0.1;
      let videoPlayer = <HTMLMediaElement>(
        document.getElementById("video-container")
      );
      videoPlayer.volume = this.volume;
    }
  }

  muteandunmute(): void {
    this.mute = !this.mute;
    let videoPlayer = <HTMLMediaElement>(
      document.getElementById("video-container")
    );
    videoPlayer.muted = this.mute;
  }
}
class control extends TV {
  remoteUrl = "remote.png";

  constructor() {
    super();

    let remoteContainer = document.createElement("div");
    remoteContainer.classList.add("remote-container");

    let remote = document.createElement("div");
    remote.classList.add("remote");

    let remoteImg = document.createElement("img");
    remoteImg.src = `${this.remoteUrl}`;
    remoteImg.id = "remote-img";
    remoteImg.setAttribute("usemap", "#remote-img");

    let remoteMap = document.createElement("map");
    remoteMap.setAttribute("name", "remote-img");

    let remotePowerCoordinates = "316,59,14";
    let remoteNumpadCoordinates = [
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
    let remoteVolumeCoordinates = ["225,334,22", "225,391,17"];
    let remoteChannelCoordinates = ["282,334,22", "282,391,17"];
    let remoteMuteUnmuteCoordinates = "193,370,8";
    let remoteAreaPower = document.createElement("area");
    remoteAreaPower.setAttribute("shape", "circle");
    remoteAreaPower.setAttribute("coords", remotePowerCoordinates);
    remoteAreaPower.setAttribute("href", "#");
    remoteAreaPower.onclick = () => {
      this.playandpause();
    };
    remoteMap.append(remoteAreaPower);

    remoteNumpadCoordinates.forEach((coordinate, numpadKey) => {
      let remoteAreaNumPad = document.createElement("area");
      remoteAreaNumPad.setAttribute("shape", "circle");
      remoteAreaNumPad.setAttribute("coords", coordinate);
      remoteAreaNumPad.setAttribute("href", "#");
      remoteAreaNumPad.onclick = () => {
        this.changeChannel(numpadKey);
      };
      remoteMap.appendChild(remoteAreaNumPad);
    });

    remoteVolumeCoordinates.forEach((coordinate, index) => {
      let remoteAreaVolume = document.createElement("area");
      remoteAreaVolume.setAttribute("shape", "circle");
      remoteAreaVolume.setAttribute("coords", coordinate);
      remoteAreaVolume.setAttribute("href", "#");
      remoteAreaVolume.onclick = () => {
        index === 0 ? this.maximumVolume() : this.minimumVolume();
      };
      remoteMap.appendChild(remoteAreaVolume);
    });

    remoteChannelCoordinates.forEach((coordinate, index) => {
      let remoteAreaChannel = document.createElement("area");
      remoteAreaChannel.setAttribute("shape", "circle");
      remoteAreaChannel.setAttribute("coords", coordinate);
      remoteAreaChannel.setAttribute("href", "#");
      remoteAreaChannel.onclick = () => {
        index === 0
          ? this.changeChannel(this.channelNo + 1)
          : this.changeChannel(this.channelNo - 1);
      };
      remoteMap.appendChild(remoteAreaChannel);
    });
    let remoteMuteUnmute = document.createElement("area");
    remoteMuteUnmute.setAttribute("shape", "circle");
    remoteMuteUnmute.setAttribute("coords", remoteMuteUnmuteCoordinates);
    remoteMuteUnmute.setAttribute("href", "#");
    remoteMuteUnmute.onclick = () => {
      this.muteandunmute();
    };
    remoteMap.append(remoteMuteUnmute);

    remote.append(remoteImg, remoteMap);
    remoteContainer.append(remote);
    document.body.append(remoteContainer);
  }
}

let remote1 = new control();
