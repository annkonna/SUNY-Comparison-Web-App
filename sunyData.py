import urllib.request
import json


def get_suny_map_data(url):
    response = urllib.request.urlopen(url)
    content = json.loads(response.read().decode())

    uc = ["STATE UNIVERSITY OF NEW YORK AT ALBANY",
          "STATE UNIVERSITY OF NEW YORK AT BINGHAMTON",
          "STATE UNIVERSITY OF NEW YORK AT BUFFALO",
          "STATE UNIVERSITY OF NEW YORK AT STONY BROOK"]

    loc = []
    for rec in content:
        if 'lat1' in rec and 'long1' in rec and \
                'campus' in rec and \
                rec["campus"] in uc:
            loc.append(
                [float(rec['lat1']),
                 float(rec['long1']),
                 rec['campus']])

    return json.dumps(loc)


def get_suny_plot_data(url):
    response = urllib.request.urlopen(url)
    content = json.loads(response.read().decode())

    uc = ["Albany",
          "Binghamton",
          "Buffalo Univ",
          "Stony Brook"]

    rates = []
    for rec in content:
        if 'campus_name' in rec and '_4_yr_grad_rate' in rec and \
                'grad_rates_as_of_year' in rec and \
                rec["campus_name"] in uc:
            rates.append(
                [rec['campus_name'],
                 int(rec['grad_rates_as_of_year'][-4:]),
                 float(rec['_4_yr_grad_rate'])])

    return json.dumps(rates)


def get_suny_chart_data(url1, url2):
    response = urllib.request.urlopen(url1)
    content = json.loads(response.read().decode())

    response = urllib.request.urlopen(url2)
    content1 = json.loads(response.read().decode())

    uc = ["Albany",
          "Binghamton",
          "Buffalo Univ",
          "Stony Brook"]

    loc = []
    for rec in content:
        for rec1 in content1:
            if rec['college_of_institution_type'].startswith(rec1['campus_name']) \
               and rec1['grad_rates_as_of_year'] == "Fall 2017"\
               and rec1['campus_name'] in uc:
                loc.append(
                    [rec1['campus_name'],
                     int(rec['undergrad_enrollment']) +
                     int(rec['graduate_enrollment']),
                     float(rec1['_4_yr_grad_rate']),
                     float(rec1['_6_yr_grad_rate']),
                     int(rec['undergrad_enrollment']),
                     int(rec['graduate_enrollment'])])

    return json.dumps(loc)

