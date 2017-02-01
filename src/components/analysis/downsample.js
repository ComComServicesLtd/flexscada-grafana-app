export const floor = Math.floor;
export const abs = Math.abs;






export function dygraph_downsample(points, threshold, aggregation) {

  var sampled = [];

  var bar_width = 2 / 3 * (points[1].canvasx - points[0].canvasx);


  var ratio = 1 / bar_width;
  if (ratio <= 1) {
    return points;
  } else {
    bar_width = 1;
    ratio = Math.round(ratio);
  }




  if (aggregation === 'avg') {
    var total_value = 0;
    var total_count = 0;

    for (var i = 0; i < points.length; i++) {

      if (total_count < ratio) {
        total_value += points[i].canvasy;
        total_count++;
        if (total_count === ratio) {
          sampled.push({
            canvasx: points[i].canvasx,
            canvasy: total_value / total_count

          });
          total_value = 0;
          total_count = 0;
        }

      }

    }
  } else if (aggregation == 'max') {

    var max_value = 0;
    var min_value = 0;
    var total_count = 0;
    for (var i = 0; i < points.length; i++) {

      if (total_count < ratio) {
        if (points[i].canvasy > max_value) {
          max_value = points[i].canvasy;
        }
        if (points[i].canvasy < min_value) {
          min_value = points[i].canvasy;
        }
        total_count++;
        if (total_count === ratio) {


          var value = min_value;
          if (Math.abs(max_value) > Math.abs(min_value))
            value = max_value;

          sampled.push({
            canvasx: points[i].canvasx,
            canvasy: value

          });

          max_value = 0;
          min_value = 0;
          total_count = 0;
        }

      }

    }

  }


  return sampled;

}

export function Downsample(data, threshold) {

  var data_length = data.length;
  if (threshold >= data_length || threshold === 0) {
    return data; // Nothing to do
  }

  var sampled = [],
    sampled_index = 0;

  // Bucket size. Leave room for start and end data points
  var every = (data_length - 2) / (threshold - 2);

  var a = 0, // Initially a is the first point in the triangle
    max_area_point,
    max_area,
    area,
    next_a;

  sampled[sampled_index++] = data[a]; // Always add the first point

  for (var i = 0; i < threshold - 2; i++) {

    // Calculate point average for next bucket (containing c)
    var avg_x = 0,
      avg_y = 0,
      avg_range_start = floor((i + 1) * every) + 1,
      avg_range_end = floor((i + 2) * every) + 1;
    avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;

    var avg_range_length = avg_range_end - avg_range_start;

    for (; avg_range_start < avg_range_end; avg_range_start++) {
      avg_x += data[avg_range_start][0] * 1; // * 1 enforces Number (value may be Date)
      avg_y += data[avg_range_start][1] * 1;
    }
    avg_x /= avg_range_length;
    avg_y /= avg_range_length;

    // Get the range for this bucket
    var range_offs = floor((i + 0) * every) + 1,
      range_to = floor((i + 1) * every) + 1;

    // Point a
    var point_a_x = data[a][0] * 1, // enforce Number (value may be Date)
      point_a_y = data[a][1] * 1;

    max_area = area = -1;

    for (; range_offs < range_to; range_offs++) {
      // Calculate triangle area over three buckets
      area = abs((point_a_x - avg_x) * (data[range_offs][1] - point_a_y) -
        (point_a_x - data[range_offs][0]) * (avg_y - point_a_y)
      ) * 0.5;
      if (area > max_area) {
        max_area = area;
        max_area_point = data[range_offs];
        next_a = range_offs; // Next a is this b
      }
    }

    sampled[sampled_index++] = max_area_point; // Pick this point from the bucket
    a = next_a; // This a is the next a (chosen b)
  }

  sampled[sampled_index++] = data[data_length - 1]; // Always add last

  return sampled;
}

export function DYDownsample(data, threshold) {

  var data_length = data.length;
  if (threshold >= data_length || threshold === 0) {
    return data; // Nothing to do
  }

  var sampled = [],
    sampled_index = 0;

  // Bucket size. Leave room for start and end data points
  var every = (data_length - 2) / (threshold - 2);

  var a = 0, // Initially a is the first point in the triangle
    max_area_point,
    max_area,
    area,
    next_a;

  sampled[sampled_index++] = data[a]; // Always add the first point

  for (var i = 0; i < threshold - 2; i++) {

    // Calculate point average for next bucket (containing c)
    var avg_x = 0,
      avg_y = 0,
      avg_range_start = floor((i + 1) * every) + 1,
      avg_range_end = floor((i + 2) * every) + 1;
    avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;

    var avg_range_length = avg_range_end - avg_range_start;

    for (; avg_range_start < avg_range_end; avg_range_start++) {
      avg_x += data[avg_range_start].canvasx * 1; // * 1 enforces Number (value may be Date)
      avg_y += data[avg_range_start].canvasy * 1;
    }
    avg_x /= avg_range_length;
    avg_y /= avg_range_length;

    // Get the range for this bucket
    var range_offs = floor((i + 0) * every) + 1,
      range_to = floor((i + 1) * every) + 1;

    // Point a
    var point_a_x = data[a].canvasx * 1, // enforce Number (value may be Date)
      point_a_y = data[a].canvasy * 1;

    max_area = area = -1;

    for (; range_offs < range_to; range_offs++) {
      // Calculate triangle area over three buckets
      area = abs((point_a_x - avg_x) * (data[range_offs].canvasx - point_a_y) -
        (point_a_x - data[range_offs].canvasy) * (avg_y - point_a_y)
      ) * 0.5;
      if (area > max_area) {
        max_area = area;
        max_area_point = data[range_offs];
        next_a = range_offs; // Next a is this b
      }
    }

    sampled[sampled_index++] = max_area_point; // Pick this point from the bucket
    a = next_a; // This a is the next a (chosen b)
  }

  sampled[sampled_index++] = data[data_length - 1]; // Always add last

  return sampled;
}
