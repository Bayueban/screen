import request from "./request.js";
// 系统信息查询
export const getSystemInfo = () => {
  return  request.get("system_info");
};

// 统计信息查询
export const getStatisticsInfo = () => {
  return  request.get("statistics_info");
};

// 传感器信息查询
export const getSensorAlarm = () => {
  return request.get("sensor_alarm_info")
};
// 日志信息查询
export const LogInfo = (data) => {
  return request.post('log_info', data)
};
// 3D点云信息查询
export const getPointCloud = () => {
  return request.get("point_cloud")
};

// 机器人路线
export const getMapInfo =()=>{
  return request.get("map_info")
}

//设置
export const SensorThresholdSet = (data) => {
  return request.post('sensor_threshold_set', data)
};