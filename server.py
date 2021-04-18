import bottle
import sunyData


@bottle.route('/')
def server_welcome():
    return bottle.static_file(
        'welcome.html', root='')


@bottle.route('/location')
def server_map_html():
    return bottle.static_file(
        'location_map.html', root='')


@bottle.route('/graduation')
def server_plot_html():
    return bottle.static_file(
        'graduation_rates_plot.html', root='')


@bottle.route('/profile')
def server_chart_html():
    return bottle.static_file(
        'profile_chart.html', root='')


@bottle.route('/map.js')
def server_map():
    return bottle.static_file('map.js', root='')


@bottle.route('/plot.js')
def server_plot():
    return bottle.static_file('plot.js', root='')


@bottle.route('/chart.js')
def server_chart():
    return bottle.static_file('chart.js', root='')


@bottle.route('/suny_map')
def get_suny_map():
    return sunyData.get_suny_map_data(
        "https://data.ny.gov/resource/a5je-8vxp.json")


@bottle.route('/suny_plot')
def get_suny_plot():
    return sunyData.get_suny_plot_data(
        "https://data.ny.gov/resource/dv3t-9r67.json")


@bottle.route('/suny_chart')
def get_suny_chart():
    return sunyData.get_suny_chart_data(
        "https://data.ny.gov/resource/a5je-8vxp.json",
        "https://data.ny.gov/resource/dv3t-9r67.json")

bottle.run(host="localhost", port=8080, debug=True, reloader=True)
# use this instead when running within codenvy - bottle.run(host="0.0.0.0", port=8080, debug=True, reloader=True)
