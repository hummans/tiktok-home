/*
 * @Author: bolan9999(shanshang130@gmail.com)
 * @Date: 2020-04-09 21:03:58
 * @Last Modified by: bolan9999(shanshang130@gmail.com)
 * @Last Modified time: 2020-04-17 17:18:04
 */

import React from "react";
import Swiper from "react-native-swiper";
import { VideoInfo } from "../../Stores/VideoInfo";
import { TVideo } from "./TVideo";

export class VideoList extends React.Component<{
  videoList: VideoInfo[];
  tabFocus: boolean;
  onFocusVideoChange: (video: VideoInfo) => any;
}> {
  render() {
    return (
      <Swiper
        horizontal={false}
        loop={false}
        bounces={false}
        showsPagination={false}
        onIndexChanged={index => {
          this.props.videoList.forEach((video, idx) => {
            if (video.focus) video.onBlur();
            if (index === idx) {
              this.props.onFocusVideoChange(video);
              video.onFocus();
            }
          });
        }}
      >
        {this.props.videoList.map((video, idx) => {
          return <TVideo video={video} key={video.id} tabFocus={this.props.tabFocus} />;
        })}
      </Swiper>
    );
  }
  componentDidMount() {
    if (this.props.videoList.length <= 0) return;
    this.props.videoList[0].onFocus();
    this.props.tabFocus && this.props.onFocusVideoChange(this.props.videoList[0]);
  }
}
