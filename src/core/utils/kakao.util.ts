export const setAddress = (res, dto) => {
  this.addressData = res;
  dto.address = this.addressData.address;

  const geocoder = new window.kakao.maps.services.Geocoder();
  const callback = (results, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      dto.lon = results[0].x;
      dto.lat = results[0].y;
    }
  };
  geocoder.addressSearch(dto.address, callback);

  this.$bvModal.hide('postcode');
};
