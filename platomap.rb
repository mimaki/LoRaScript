# gem install 'httpclient'
require 'httpclient'
require 'base64'

class PlatoMap
  HOST = 'http://map.plato.click'

  def initialize(id)
    @devid = []
    case id
    when Integer
      @devid[0] = (id >> 16) & 0xff
      @devid[1] = (id >> 8) & 0xff
      @devid[2] = id & 0xff
    when Array
      @devid = id
    else
      raise ArgumentError.new("ID error.")
    end
    @client = HTTPClient.new
  end

  def temperature(temp)
    data = [0x04] + @devid << temp
    post Base64.encode64(data.pack('ccccf'))
  end

  def humidity(hum)
    data = [0x05] + @devid << hum
    post Base64.encode64(data.pack('ccccf'))
  end

  def gpsgga(lat, lng)
    data = [0x09] + @devid << 0 << lat << lng << 0
    post Base64.encode64(data.pack('ccccffff'))
  end

  def post(b64)
    @client.post(HOST, b64, 'Content-Type' => 'text/plain')
  end
end
